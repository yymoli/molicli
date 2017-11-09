


function _getImageSrc(path, type) {
  if (path == null) return null;
  return path;
  // if (type == "wx") {
  //   return wxGetServerImageUrl(path.substring(3));
  // } else if (type == "oss") {
  //   return path;
  // } else {
  //   if (window._IN_APP) {
  //     return `images/${path}`;
  //   } else {
  //     return images[path] ? images[path] : `${APP_PATH}/images/${path}`;
  //   }
  // }
}

function getImageSrc(info, type) {
  if (info == null) return null;

  if (info.toJS) info = info.toJS();

  if (info.localUrl) {
    return info.localUrl;
  } else if (info.url && info.type) {
    return _getImageSrc(info.url, info.type);
  } else {
    return _getImageSrc(info, type);
  }
}

export default getImageSrc;
