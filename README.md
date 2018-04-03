# Example app with Angular 5 + Angular Material2 + Angularfire2


> ### Angular material2 component showcase. Angularfire2 basic manipulation, authentication (email and social) and storage. File, FileList and FileReader WebAPIs sample application. (Feat. [ng-snotify](https://artemsky.github.io/ng-snotify/))


## DEMO

### Live DEMO [here](https://goo.gl/WQQFUj)

<img src="./src/assets/markdown/albumd.png" alt="album-a" style=""/>

</br>  

## Login page and registration

#### Sign in using email and password or using social media.  

</br>  

<img src="./src/assets/markdown/pagea.png" alt="album-a" style="width: 500px;"/>
<img src="./src/assets/markdown/pageb.png" alt="album-a" style="width: 500px; margin-left:20px;"/>

## Main-feed module

#### Post images, text and view other users posts.  

</br>  

<img src="./src/assets/markdown/feeda.png" alt="album-a" style="width: 500px;"/>
<img src="./src/assets/markdown/feedb.png" alt="album-a" style="width: 500px; margin-left:20px;"/>


## Profile Module

#### See your own posts in profile, post images and text and delete any post.

</br>  

<img src="./src/assets/markdown/profilea.png" alt="album-a" style="width: 500px;"/>
<img src="./src/assets/markdown/profileb.png" alt="album-a" style="width: 500px; margin-left:20px;"/>

<img src="./src/assets/markdown/profilec.png" alt="album-a" style="width: 500px;"/>

## Album module

#### View other users uploaded photos in album, upload and delete photos in your own album, displays selected photos pending to upload and loading notification box.

</br>  

<img src="./src/assets/markdown/albuma.png" alt="album-a" style="width: 500px;"/>
<img src="./src/assets/markdown/albumb.png" alt="album-a" style="width: 500px; margin-left:20px;"/>

<img src="./src/assets/markdown/albumc.png" alt="album-a" style="width: 500px;"/>
<img src="./src/assets/markdown/albumd.png" alt="album-a" style="width: 500px; margin-left:20px;"/>

<img src="./src/assets/markdown/albume.png" alt="album-a" style="width: 500px;"/>
<img src="./src/assets/markdown/albumf.png" alt="album-a" style="width: 500px; margin-left:20px;"/>

</br>  


## Usage

**Warning: install the latest [Node.js](https://nodejs.org/en/) engine node >= 8.0.0**

*   `git clone https://github.com/ElecTreeFrying/mini-dashboard-app.git dashboards`
*   `cd dashboards`
*   `npm install`

Create an account [firebase console](https://console.firebase.google.com).

1.  Select _Add Project_
1.  Select Authentications
1.  Click copy **WEB SETUP**
1.  Setup rtdb rules. Database -> Realtime Database -> RULES

    ```
    {
      "rules": {
        "app-users": {
        	".read": "auth !== null",
        	".write": "auth !== null"  
        },
        "app-posts": {
        	".read": "auth !== null",
        	".write": "auth !== null"  
        },
        "app-uploads": {
        	".read": "auth !== null",
        	".write": "auth !== null"  
        }
      }
    }
    ```

1.  Create the environment files below in `src/environments/`.

    **environment.prod.ts**

    ```
    export const environment = {
      production: true,
      firebaseConfig: { **WEB SETUP** }
    };

    ```

    **environment.ts**

    ```
    export const environment = {
      production: false,
      firebaseConfig: { **WEB SETUP** }
    };

    ```

## License

MIT

Enjoy Special thanks to chibi [2B](http://nier.wikia.com/wiki/YoRHa_No.2_Type_B) <img src="./src/assets/markdown/avatar2b.jpg" alt="album-a" style="width: 50px; border-radius:20px; margin-left:5px"/>

We are always happy to hear your feedback!
