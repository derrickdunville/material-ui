// Username - only alphanumerics and underscores
export const usernameRegex = new RegExp("^[a-zA-Z0-9_]+$")

// Password
// Strong password
export const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
// contains lowercase char
export const lowercaseAlphaRegex = new RegExp("^(?=.*[a-z])")
// contains uppercase char
export const uppercaseAlphaRegex = new RegExp("^(?=.*[A-Z])")
// contatins number
export const numericRegex = new RegExp("^(?=.*[0-9])")
// contains special char
export const specialRegex = new RegExp("^(?=.*[!@#\$%\^&])")
// length is 8 or greater
export const lengthRegex = new RegExp("^(?=.{8,})")
