const express = require("express");
const fs = require('fs')
const app = express();
const Instagram = require("instagram-web-api");

const instagramLoginFuction = async (usuario, contra, des, file) => {
    let status = "false"
    const user = {
        username: usuario,
        password: contra
    }
    console.log(user)
    const client = new Instagram(user);
    try {
        await client.login()
        console.log("despues")
    } catch (error) {
        console.log(error)
        console.log("Error al iniciar sesion");
    }
    try {
        const z = await client.uploadPhoto({ photo:  file, caption: des, post: 'feed' }).then( x => {
        console.log(z)
        })
    } catch (error) {
        console.log(error)
        console.log("Error al subir foto");
    }
}

exports.instagramLoginFuction = instagramLoginFuction;
