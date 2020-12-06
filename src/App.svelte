<script>
  import { FirebaseApp, User, Doc, Collection } from "sveltefire";

  import firebase from "firebase/app";
  import "firebase/firestore";
  import "firebase/auth";
  import "firebase/performance";
  import "firebase/analytics";

  let firebaseConfig = {
    apiKey: APP_ENV_FIREBASE_API_KEY,
    authDomain: APP_ENV_FIREBASE_AUTH_DOMAIN,
    databaseURL: APP_ENV_FIREBASE_DATABASE_URL,
    projectId: APP_ENV_FIREBASE_PROJECT_ID,
    storageBucket: APP_ENV_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: APP_ENV_FIREBASE_MESSAGING_SENDER_ID,
    appId: APP_ENV_FIREBASE_APP_ID,
    measurementId: APP_ENV_FIREBASE_MEASUREMENT_ID,
  };

  firebase.initializeApp(firebaseConfig);
</script>

<style>
  .centered {
    display: grid;
    height: 20vh;
    justify-content: center;
    align-items: center;

    font-weight: 900;
    font-size: xx-large;
  }

  h1,
  em {
    color: #ff3e00;
  }

  hr {
    height: 1px;
    border: none;
    background: rgb(195, 195, 195);
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main class="centered">
  <!-- Tailwindcss -->
  <p class="text-gray-500">Hola mundo, como va...</p>

  <!-- SvelteFire -->
  <!-- 0. 🔥 Firebase project check config -->
  {#if !firebaseConfig.projectId}
    <strong>Step 0</strong>
    Create a
    <a href="https://firebase.google.com/">Firebase Project</a>
    and paste your web config into
    <code>App.svelte</code>
    .
  {/if}

  <!-- 1. 🔥 Firebase App -->
  <FirebaseApp {firebase}>
    <h1>APP_ENV_APP_NAME - APP_ENV_APP_VERSION</h1>

    <!-- 2. 😀 Get the current user -->
    <User let:user let:auth>
      😀 - usuario:
      <em>{user.uid}</em>

      <button on:click={() => auth.signOut()}>Salir</button>

      <div slot="signed-out">
        <button on:click={() => auth.signInAnonymously()}>
          Sign In Anonymously
        </button>
      </div>

      <hr />

      <!-- 3. 📜 Get a Firestore document owned by a user -->
      <Doc path={`posts/${user.uid}`} let:data={post} let:ref={postRef} log>
        <h2>{post.title}</h2>

        <p>
          Document created at
          <em>{new Date(post.createdAt).toLocaleString()}</em>
        </p>

        <span slot="loading">Loading post...</span>
        <span slot="fallback">
          <button
            on:click={() => postRef.set({
                title: '📜 I like Svelte',
                createdAt: Date.now(),
              })}>
            Create Document
          </button>
        </span>

        <!-- 4. 💬 Get all the comments in its subcollection -->
        <h3>Comments</h3>
        <Collection
          path={postRef.collection('comments')}
          query={(ref) => ref.orderBy('createdAt')}
          let:data={comments}
          let:ref={commentsRef}
          log>
          {#if !comments.length}No comments yet...{/if}

          {#each comments as comment}
            <p>
              <!-- ID: <em>{comment.ref.id}</em> -->
            </p>
            <p>
              {comment.text}
              <button on:click={() => comment.ref.delete()}>Delete</button>
            </p>
          {/each}

          <button
            on:click={() => commentsRef.add({
                text: '💬 Me too!',
                createdAt: Date.now(),
              })}>
            Add Comment
          </button>

          <span slot="loading">Loading comments...</span>
        </Collection>
      </Doc>
    </User>
  </FirebaseApp>
</main>
