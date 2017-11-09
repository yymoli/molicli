import axios from 'axios';

export function processImage(path, options) {
  let a = [];
  let resizeOpts = options.resize || {};

  for(let k in resizeOpts) {
    if (resizeOpts.hasOwnProperty(k)) {
      let v = resizeOpts[k];
      if (v != null) a.push(`${k}_${v}`);
    }
  }

  let resizeString = "/resize," + a.join(",");

  let formatString = "";

  if (options.format) {
    formatString = `/format,${options.format}`;
  }

  let interlaceString = "";

  if (options.format == "jpg") {
    let i = options.interlace  == null ? "1" : "0";
    interlaceString = `/interlace,${i}`;
  }


  return `${path}?x-oss-process=image${resizeString}${formatString}${interlaceString}`;
}





export function getImageInfo(path) {
  let serviceUrl = `${path}?x-oss-process=image/info`;
  console.log("getImageInfo:", serviceUrl);

  return axios({
    type: "GET",
    url: serviceUrl,
    dataType: "json",
    data: {}
  })

  // return new Promise(function (resolve, reject) {
  //   ajax(
  //     {
  //       method: "GET",
  //       url: serviceUrl,
  //       dataType: "json",
  //       data: {}
  //     },
  //     function (data){
  //       console.log("getImageInfo result:", data);
  //       resolve({
  //           fileSize: parseInt(data.FileSize.value),
  //           format: data.Format.value,
  //           imageWidth: parseInt(data.ImageWidth.value),
  //           imageHeight: parseInt(data.ImageHeight.value),
  //         });
  //     },
  //
  //     function (jqXHR, textStatus, errorThrown){
  //       console.warn("getImageInfo failed:", jqXHR, textStatus, errorThrown);
  //       reject(new Error(jqXHR.responseText));
  //     }
  //   );
  // });
}