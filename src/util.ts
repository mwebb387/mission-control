export function arrayMove<T>(arr: T[], oldIndex: number, newIndex: number) {
    let spliceIndex = Math.max(0, Math.min(newIndex, arr.length));
    arr.splice(spliceIndex, 0, arr.splice(oldIndex, 1)[0]);
    return arr;
}

export function clone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export function createUUID(): string {
  return crypto.randomUUID();
}

export default {
  clone,
  createUUID
}
