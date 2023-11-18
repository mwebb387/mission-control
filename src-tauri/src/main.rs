// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{env::var_os, fs, process::Command};
use serde::{Serialize, Deserialize};
use serde_json::error;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn start_session(commands: Vec<ExecutionCommand>) -> Vec<String> {
    let mut errors: Vec<String> = Vec::new();
    for ex in commands {
        if ex.runAsAdmin {
            match run_elevated(&ex) {
                Ok(_) => (),
                Err(e) => errors.push(format!("Error for {:?}: {:?}", ex.path, e))
            }
        } else {
            match run_normal(&ex) {
                Ok(_) => (),
                Err(e) => errors.push(format!("Error for {:?}: {:?}", ex.path, e))
            }
        }
    }

    errors
}

#[tauri::command]
fn load_config() -> String {
    let config_path = get_config_dir() + "\\sessionrunner\\sessionrunner.config";
    let config = fs::read_to_string(config_path);

    match config {
        Ok(str) => str,
        Err(_) => String::from("")
    }
}

#[tauri::command]
fn save_config(config: String) -> bool {
    let config_path = get_config_dir() + "\\sessionrunner\\sessionrunner.config";
    let result = fs::write(config_path, config);

    match result {
        Ok(_) => true,
        Err(_) => false
    }
}

#[derive(Serialize, Deserialize, Debug)]
struct ExecutionCommand {
  path: String,
  args: Vec<String>,
  runAsAdmin: bool,
}

fn get_config_dir() -> String {
    if cfg!(windows) {
        return var_os("LOCALAPPDATA").unwrap().to_str().unwrap().into()
    } else {
        return var_os("XDG_CONFIG_HOME").unwrap().to_str().unwrap().into()
    }
}

fn run_normal(cmd: &ExecutionCommand) -> Result<(), String> {
    let proc = Command::new(&cmd.path)
        .args(&cmd.args)
        .spawn();

    match proc {
        Ok(_) => Ok(()),
        Err(e) => Err(e.to_string())
    }
}

fn run_elevated(cmd: &ExecutionCommand) -> Result<(), String> {
    let proc = runas::Command::new(&cmd.path)
        .args(cmd.args.as_ref())
        .status();

    match proc {
        Ok(_) => Ok(()),
        Err(e) => Err(e.to_string())
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            load_config,
            save_config,
            start_session
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
