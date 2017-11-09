import { getDeviceidAndToken } from './getHeaderRequest'
import { browserRedirect } from './util';
import {RootURL,tsURL,headerTest} from 'config/constants'

export const upload = ( paramObj, successCallback, errorCallback ) => {
	let fileURL = paramObj.fileURL;
	let SERVER = '';
	SERVER=RootURL+paramObj.url;
	let params = paramObj.param;
	let headers = getDeviceidAndToken();
	summer.upload({
		"fileURL" : fileURL, //需要上传的文件路径
		"type" : "image/jpeg", //上传文件的类型 > 例：图片为"image/jpeg"
		"params" : params, //上传参数
		"SERVER" : SERVER //服务器地址
	}, function(ret){
		let data = JSON.parse(ret.response);
		successCallback(data);
	}, function(err){
		errorCallback(err);
	},headers);
}
