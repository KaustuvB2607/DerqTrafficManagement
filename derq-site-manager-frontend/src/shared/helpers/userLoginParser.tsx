

export default function userLoginParser(userObject: Object) {
    return userObject ? JSON.stringify(userObject).split(" ")[0].replaceAll(/(^"|"$)/g, "") : "";
}