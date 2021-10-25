
import { SkynetClient, Permission, PermCategory, PermType } from "skynet-js";
import { UserProfileDAC } from "@skynethub/userprofile-library";
const userProfile = new UserProfileDAC();
const portal = window.location.hostname === 'localhost' ? "https://siasky.net" : undefined;
const client = new SkynetClient(portal);

export class MySky {
    constructor(name, sessionStart){
        this.name = name
        this.start = sessionStart
        this.seed = ""
        this._init()
        this.skynetClient = { registry: { getEntry: {}, getFileContent: {}}}
        this.skynetClient["registry"]["getEntry"] = async function(path, callback){
            this.getJSON(path, callback)
        }
        this.skynetClient["registry"]["getFileContent"] = function(skylink){
            // convert the file to a dataURL, save it as encrypted json
            return new Promise((resolve, reject) => {
                _mysky.getJSONEncrypted("blobs.json").then((json) => {
                    let url = json.blobs[skylink.replace("sia:", "")]
                    fetch(url).then(res => res.blob()).then((blob) => resolve(blob))
                })
            })
        }
        this.skynetClient.uploadFile = function(blob) {
            // convert the file to a dataURL, save it as encrypted json
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
    /**
     * Get the user's seed, set up the profile DAC, call whatever function was passed into the constructor as the start function. 
     * We will add some variables to the window that will be used later on 
     */
    async _init(){
        let reqDomain = await client.extractDomain(window.location.hostname)
        window._reqDomain = reqDomain
        let mysky = await client.loadMySky(reqDomain)
        await mysky.loadDac(userProfile);
        window._mysky = mysky
        let loggedIn = await mysky.checkLogin()
        window._loggedIn = loggedIn
        if(loggedIn){
            let userID = await mysky.userID()
            window._userID = userID
            this.seed = window["_userID"]
            this.start("login_success")
        }
    }
    /**
     * Try and start as if the user is logged in, if they aren't open the MySky window
     */
    async sessionStart(){
        await this._init()
        if(!_loggedIn) _mysky.requestLoginAccess()
    }
    /**
     * Logout
     */
    async sessionDestroy(){     
        await _mysky.logout();
    }
    // Set json as encrypted, call the callback
    async setJSON(path, json, callback){
        path = path.replace(":", "-")
        await _mysky.setJSONEncrypted(_reqDomain + "/" + path + ".json", {[path]: json})
        callback()
    }
    // Retrieve encrypted data and return it to the callback in the correct structure
    async getJSON(path, callback){
        path = path.replace(":", "-")
        let result = await _mysky.getJSONEncrypted(_reqDomain + "/" + path + ".json")
        callback({entry: result["data"] ? {data: result.data[path], datalink: result.datalink} : null})
    }
    // Should set the user's MySky profile, but not sure if this is really necessary
    async setRegistry(path, json, callback) { 
        let prof = await userProfile.getProfile(_userID)
        path = path.replace("hackerpaste:", "")
        prof[path] = json
        await userProfile.setProfile(prof)
        callback({entry: prof[path] ? {data: prof[path]} : null})
    }
    // Retrieve the user's MySky profile
    async getRegistry(path, callback){
        const prof = await userProfile.getProfile(_userID)
        path = path.replace("hackerpaste:", "")
        callback({entry: prof[path] ? {data: prof[path]} : null})
    }
    hideOverlay(){}
}
