# Getting started

## Setup

After cloning the repository
2. Navigate to `ssl/` and run the `generate.sh` script
3. Click on the `server.crt` file and press `Shift+Alt+R` to open it in the file explorer
4. Install the certificate in root authorities:
   1. Double-click `server.crt` file
   2. Click `Install certificate...`
   3. Select `Current User` and click `Next`
   4. Select `Place all certificates in the following store`
   5. Click `Browse...` and select the folder `Trusted Root Certification Authorities` and click `OK`
   6. Click `Next` and `Finish`
   7. You should now get a message confirming that the import was successful
   8. Close the widget by clicking `OK`
5. Run either
   - `yarn install`,
   - `npm install`
   - `pnpm install`

Now you should be able to start the demo website by running either

- `yarn dev`,
- `npm dev`
- `pnpm dev`