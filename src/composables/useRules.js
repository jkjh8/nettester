export const required = (v) => !!v || false
export const minPort = (v) => v > 0 || false
export const maxPort = (v) => v < 65535 || false
//ipaddress
export const chkIpaddress = (v) =>
  /^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$/gm.test(
    v
  ) || false
