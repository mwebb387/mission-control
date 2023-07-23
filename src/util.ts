export function arrayMove<T>(arr: T[], oldIndex: number, newIndex: number) {
    let spliceIndex = Math.max(0, Math.min(newIndex, arr.length));
    arr.splice(spliceIndex, 0, arr.splice(oldIndex, 1)[0]);
    return arr;
}

export function clone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export function createGuid(): string {
  const uid = new Date().getTime().toString(16)
    + Math.random().toString(16).substring(2)
    + '0'.repeat(16);
  return `${uid.substr(0, 8)}-${uid.substr(8, 4)}4000-8${uid.substr(12, 3)}-${uid.substr(15, 12)}`;
}

export function createID(): string {
  return '_' + Math.random().toString(36).substr(2, 9);
}

export default {
  clone,
  createGuid,
  createID
}
