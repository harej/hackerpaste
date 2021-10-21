
import { SkynetClient, Permission, PermCategory, PermType } from "skynet-js";
import { UserProfileDAC } from "@skynethub/userprofile-library";
const portal = window.location.hostname === 'localhost' ? "https://siasky.net" : undefined;
const client = new SkynetClient(portal);

export class MySky {
    constructor(name, sessionStart){
        this.name = name
        this.start = sessionStart
        this.seed = ""
        this._init()
        this.skynetClient.registry.getEntry = async function(path, callback){
            this.getJSON(path, callback)
        }
        this.skynetClient.registry.getFileContent = function(skylink){
            return new Promise((resolve, reject) => {
                _mysky.getJSONEncrypted("blobs.json").then((json) => {
                    let url = json.blobs[skylink.replace("sia:", "")]
                    fetch(url).then(res => res.blob()).then((blob) => resolve(blob))
                })
            })
        }
        this.skynetClient.uploadFile = function(blob) {
            return new Promise((resolve, reject) => {
                _mysky.getJSONEncrypted("blobs.json").then((json) => {
                    let data = new FileReader()
                    data.onload = function(url){
                        json.blobs.push(url)
                        console.log(json.blobs)
                        _mysky.setJSONEncrypted("blobs.json", json).then((result) => {
                            resolve({skylink: "sia:" + json.blobs.length})
                        })
                    } 
                    data.readAsDataURL(blob);
                })
            })
        }
    }
    async _init(){
        let reqDomain = await client.extractDomain(window.location.hostname)
        window._reqDomain = reqDomain
        let mysky = await client.loadMySky(reqDomain)
        window._mysky = mysky
        let loggedIn = await mysky.checkLogin()
        window._loggedIn = loggedIn
        if(loggedIn){
            let userID = await mysky.userID()
            window._userID = userID
            this.seed = window["_userID"]
            this.start("login_success");
        }
    }
    async sessionStart(){
        await this._init()
        if(!_loggedIn) _mysky.requestLoginAccess()
    }
    async sessionDestroy(){     
        await _mysky.logout();
    }
    async setJSON(path, json, callback){
        path = path.replace(":", "-")
        await _mysky.setJSONEncrypted(_reqDomain + "/" + path + ".json", {[path]: json})
        callback()
    }
    async getJSON(path, callback){
        path = path.replace(":", "-")
        let result = await _mysky.getJSONEncrypted(_reqDomain + "/" + path + ".json")
        callback({entry: result["data"] ? {data: result.data[path], datalink: result.datalink} : null})
    }
    async setRegistry(path, json, callback) { this.setJSON(path, json, callback) }
    async getRegistry(path, callback){ this.getJSON(path, callback)}
    hideOverlay(){}
}
