/**
 * Created by elie on 24.09.2016.
 */
// Your Client ID can be retrieved from your project in the Google
// Developer Console, https://console.developers.google.com
var CLIENT_ID = '1071613291540-f749747scb0ncduk7tol9pro2ccd9eu1.apps.googleusercontent.com';

var SCOPES = ['https://www.googleapis.com/auth/drive.appdata'];

var ID = undefined;
/**
 * Check if current user has authorized this application.
 */
function checkAuth() {
    gapi.auth.authorize(
        {
            'client_id': CLIENT_ID,
            'scope': SCOPES.join(' '),
            'immediate': true
        }, handleAuthResult);
}

/**
 * Handle response from authorization server.
 *
 * @param {Object} authResult Authorization result.
 */
function handleAuthResult(authResult) {
    var authorizeDiv = document.getElementById('authorize-div');
    if (authResult && !authResult.error) {
        // Hide auth UI, then load client library.
        authorizeDiv.style.display = 'none';
        loadDriveApi();
    } else {
        // Show auth UI, allowing the user to initiate authorization by
        // clicking authorize button.
        authorizeDiv.style.display = 'inline';
    }
}

/**
 * Initiate auth flow in response to user clicking authorize button.
 *
 * @param {Event} event Button click event.
 */
function handleAuthClick(event) {
    gapi.auth.authorize(
        {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
        handleAuthResult);
    return false;
}

/**
 * Load Drive API client library.
 */
function loadDriveApi() {
    gapi.client.load('drive', 'v3', listFiles);
}

/**
 * Print files.
 */
function listFiles() {
    var request = gapi.client.drive.files.list({
        'spaces': 'appDataFolder',
        'pageSize': 10,
        'q': 'name = "bookmarks.json"',
        'fields': "nextPageToken, files(id, name, webContentLink)"
    });

    request.then(function(resp) {
        appendPre('Files:');
        var files = resp.result.files;
        if (files && files.length > 0) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                appendPre(file.name + ' ( url: ' + file.webContentLink +', id: ' + file.id + ')');
                ID = file.id;
            }
        } else {
            appendPre('No files found.');
            createBookmarkFile();
        }
    });
}

function createBookmarkFile() {
    gapi.client.drive.files.create(
        {
            'fields': 'id, name, webContentLink',
            'name': 'bookmarks.json',
            'parents': ['appDataFolder'],
            'mimeType': 'application/json',
            'uploadType': 'media',
            'body': '{"id": "1","modifiedByMeTime": "12123","name": "asdasd","md5Checksum": "12asdd"}'
        }
    ).then(function(file) {
        appendPre("Created file " + file.result.name + " id: " + file.result.id);
        ID = file.result.id;
    });
}

function readBookmarkFile() {
    gapi.client.drive.files.get(
        {
            'fileId' : ID,
            'fields': 'appProperties,capabilities,contentHints,createdTime,description,explicitlyTrashed,fileExtension,folderColorRgb,fullFileExtension,headRevisionId,iconLink,id,imageMediaMetadata,isAppAuthorized,kind,lastModifyingUser,md5Checksum,mimeType,modifiedByMeTime,modifiedTime,name,originalFilename,ownedByMe,owners,parents,permissions,properties,quotaBytesUsed,shared,sharedWithMeTime,sharingUser,size,spaces,starred,thumbnailLink,trashed,version,videoMediaMetadata,viewedByMe,viewedByMeTime,viewersCanCopyContent,webContentLink,webViewLink,writersCanShare'
        }
    ).then(function(file) {
        appendPre("Getting file " + file.name + " id: " + file.id + ", downloaded from: " + file.webContentLink);

        $.get( file.webContentLink, function( data ) {
            alert( "Load was performed." );
        });
    });
}

function deleteBookmarkFile() {
    gapi.client.drive.files.delete(
        {   "fileId" : ID
        }
    ).execute(function(result) {
        appendPre("File deleted.");
    });
}
/**
 * Append a pre element to the body containing the given message
 * as its text node.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
    var pre = document.getElementById('output');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
}

$(function(){
    $('#authorizeMyBookmark').click(function(event){
        handleAuthClick(event);
    });

    $('#readBookmark').click(function(){
        readBookmarkFile();
    });
    $('#deleteBookmark').click(function(){
        deleteBookmarkFile();
    });
});
