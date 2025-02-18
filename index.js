// const tokenUrl = "https://cloudsciencelabs-9d-dev-ed.develop.my.salesforce.com/services/oauth2/token";
// const clientId = "3MVG9VMBZCsTL9hkhg.jbfAPRpI7kiQgqkggzLhc6Vuz3Bfbl0quL9F_afeRig.xWTf9o3jGtf1i9xj0WvSHJ";
//  const clientSecret = "FF03DE3DC8900436BE8606EFFCFE8514292918E262560C9CF4B529407F144D17";
//  const username = "rajeev@cloudsciencelabs.com";
//  const password = "Agra@1234";
//  const securityToken = "eyxLEKqpiJ0ARASz1B5wpAoM";

//     function getAccessToken() {
//         console.log("Fetching Salesforce OAuth token...");

//         const data = {
//             grant_type: 'password',
//             client_id: clientId,
//             client_secret: clientSecret,
//             username: username,
//             password: password + securityToken
//         };

//         return fetch(tokenUrl, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//             body: new URLSearchParams(data)
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log("OAuth Token Received:", data);
//             return data.access_token;
//         })
//         .catch(error => console.error("Error fetching access token:", error));
//     }

//     function uploadFileToSalesforce(file) {
//         getAccessToken().then(accessToken => {
//             const fileReader = new FileReader();

//            //fileReader.onload = function(event) {
//            //     const fileData = event.target.result.split(',')[1];

//              //   const uploadUrl = 'https://cloudsciencelabs-9d-dev-ed.develop.my.salesforce.com/services/data/v54.0/sobjects/ContentVersion/';
//              //   const requestData = {
//               //      Title: file.name,
//               //      PathOnClient: file.name,
//               //      VersionData: fileData
//               //  };

//               //  console.log("Uploading file to Salesforce...", requestData);

//               //  fetch(uploadUrl, {
//                //     method: 'POST',
//                //     headers: {
//                //         'Authorization': 'Bearer ' + accessToken,
//                 //        'Content-Type': 'application/json'
//                 //    },
//                 //    body: JSON.stringify(requestData)
//                // })
//                // .then(response => response.json())
//                // .then(data => {
//               //      console.log("File uploaded successfully:", data);
//               //  })
//               //  .catch(error => console.error("Error uploading file:", error));
//           //  };

//             fileReader.readAsDataURL(file);
//         });
//     }

//     document.getElementById('fileInput').addEventListener('change', function(event) {
//         const file = event.target.files[0];
//         if (file) {
//             console.log("File selected:", file.name);
//             uploadFileToSalesforce(file);
//         }
//     });



        const tokenUrl = "https://saas-inspiration-2755--dev.sandbox.my.salesforce.com/services/oauth2/token";
        const clientId = "3MVG9HbBKF.OyqUfhGc_mmKgDGcg2wr._iLh.sFF8SsXfNbsf8lgPfFqjlHpQNKY03etaQWJJAuG_V4Fo1JCt";
        const clientSecret = "67451A422D75C3663A054AB7E20686C325E3AD82490336D742DB6B0EA8D7E82C";
        const username = "aksharma@cloudsciencelabs.com.mcp.dev";
        const password = "Logmein@143";
        const securityToken = "rz6e9PAERcjn111DAiEpcDlg";

        function getAccessToken() {
            console.log("Fetching Salesforce OAuth token...");
            const data = {
                grant_type: 'password',
                client_id: clientId,
                client_secret: clientSecret,
                username: username,
                password: password + securityToken
            };

            return fetch(tokenUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(data)
            })
                .then(response => response.json())
                .then(data => {
                    console.log("OAuth Token Received:", data);
                    return data.access_token;
                })
                .catch(error => console.error("Error fetching access token:", error));
        }

        function uploadFileToSalesforce(file, accessToken) {
            const fileReader = new FileReader();
            fileReader.onload = function (event) {
                const fileData = event.target.result.split(',')[1];

                const uploadUrl = 'https://saas-inspiration-2755--dev.sandbox.my.salesforce.com/services/data/v54.0/sobjects/ContentVersion/';
                const requestData = {
                    Title: file.name,
                    PathOnClient: file.name,
                    VersionData: fileData
                };

                fetch(uploadUrl, {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + accessToken,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestData)
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log("File uploaded successfully:", data);
                         const contentDocumentId = data.id; 
                        console.log('contentDocumentId--------------------------',contentDocumentId);
                        document.getElementById('00Nbf000001GLr7').value = contentDocumentId;
                        
                    })
                    .catch(error => console.error("Error uploading file:", error));
            };
            fileReader.readAsDataURL(file);
        }

        document.getElementById('fileInput').addEventListener('change', function (event) {
            const file = event.target.files[0];
            if (file) {
                console.log("File selected:", file.name);
                getAccessToken().then(accessToken => {
                    uploadFileToSalesforce(file, accessToken);
                });
            }
        });
    
