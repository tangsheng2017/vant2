const config = require("../config");

function setlocalStorage(key, val) {
  localStorage.setItem(config.prefix + key, val);
}

function getlocalStorage(key) {
  let item = localStorage.getItem(config.prefix + key);
  return item;
}

function removelocalStorage(key) {
  localStorage.removeItem(config.prefix + key);
}

function checklocalStorage(key) {
  let userdata = getlocalStorage(key);
  if (userdata) {
    try {
      userdata = JSON.parse(userdata);
      return userdata;
    } catch (err) {
      return false;
    }
  } else {
    return false;
  }
}

export {
  setlocalStorage,
  getlocalStorage,
  removelocalStorage,
  checklocalStorage
};
