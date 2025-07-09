# Karaoke

Queue and play karaoke songs from YouTube.


### To run

Install webpack and the development server:

```
> $ npm i webpack-dev-server webpack -g
```

You can simply run webpack build using this command: 

```
> $ npm run build
```

If you want to run with webpack-dev-server simply run this command: 

```
> $ npm run dev
```

Building for procution:

```
> $ npm run build-prod
```

Open the web browser to `http://localhost:8888/`


### Google API keys

The Google API key is loaded from the `GOOGLE_API_KEY` environment variable during build. This can be set in the shell or loaded automatically from `.envrc` when `direnv` is being used. The API key is stored in `settings.youtube.apiKey` in the JavaScript runtime.

API keys can be managed in the [Google Cloud Console](https://console.cloud.google.com/apis/dashboard). It needs to use the "YouTube Data API v3" service. The API key can be configured in the "Credentials" section of the Google Cloud Console. It should be restricted to the website URL that the app is deployed to, and `http://localhost:8888/*` for local development.

### Deploying

```
> $ sh deploy.sh
```
