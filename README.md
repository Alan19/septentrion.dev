# septentrion.dev

This is the repository for Alcor's personal website! To run this locally, you can follow the following steps:

1. Clone this repository.
2. Install the npm dependencies in both the root folder and the `api` folder using `npm i`.
3. Populate the `.env` file in the api folder with the following keys:

```dotenv
AWS_ACCESS_KEY_ID='Your AWS Access Key'
AWS_SECRET_ACCESS_KEY='The secret key for the S3 bucket that contains your images 
BUCKET_NAME='The name of the S3 bucket that contains your images'
PORT=9000
NODE_ENV=development
REGION='The region your AWS bucket is located'
```

4. Run `npm run dev` on both `package.json` and `api/package.json`.
5. Run `git update-index --skip-worktree` on the `hidden.json` file so that changes to the hidden file doesn't get reflected in Git.