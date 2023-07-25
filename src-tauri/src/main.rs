// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{env::var_os, fs, ffi::OsStr, process::Command};
use serde::{Serialize, Deserialize};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn get_dir_entries(path: String) -> Vec<FileSystemEntry> {
    let path = if path.is_empty() {
        var_os("USERPROFILE")
            .unwrap() // TODO: First unwrap error handling?
            .to_str()
            .unwrap_or_else(|| "")
            .into()
    } else {
        path
    };
    let parent_path = path.clone() + "\\..";

    let mut entries = Vec::new();
    entries.push(FileSystemEntry { name: "..".into(), path: parent_path, is_directory: true, extension: "".into() });

    let rd = fs::read_dir(path);

    match rd {
        Ok(rd) => rd
            .into_iter()
            .filter_map(|e| e.ok())
            .for_each(|dir| entries.push(FileSystemEntry {
                name: dir.file_name().to_str().unwrap_or_else(|| "").into(),
                path: dir.path().to_str().unwrap_or_else(|| "").into(),
                is_directory: dir.path().is_dir(),
                extension: dir.path().extension().unwrap_or_else(|| OsStr::new("")).to_str().unwrap_or_else(|| "").into()
            })),
        Err(_) => ()
    }

    return entries;
}

#[tauri::command]
fn start_session(commands: Vec<ExecutionCommand>) {
    for ex in commands {
        if ex.runAsAdmin {
            run_elevated(ex)
        } else {
            run_normal(ex)
        }
    }
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
struct FileSystemEntry {
  name: String,
  path: String,
  is_directory: bool,
  extension: String
}

#[derive(Serialize, Deserialize, Debug)]
struct ExecutionCommand {
  path: String,
  args: Vec<String>,
  runAsAdmin: bool,
}

fn get_config_dir() -> String {
    // TODO: For linux/mac?
    return var_os("LOCALAPPDATA").unwrap().to_str().unwrap().into()
}

fn run_normal(cmd: ExecutionCommand) {
    let proc = Command::new(cmd.path)
        .args(cmd.args)
        .spawn();

    match proc {
        Ok(_) => (),
        Err(e) => println!("{:?}", e)
    }
}

fn run_elevated(cmd: ExecutionCommand) {
    let proc = runas::Command::new(cmd.path)
        .args(cmd.args.as_ref())
        .status();

    match proc {
        Ok(_) => (),
        Err(e) => println!("{:?}", e)
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_dir_entries,
            load_config,
            save_config,
            start_session
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
