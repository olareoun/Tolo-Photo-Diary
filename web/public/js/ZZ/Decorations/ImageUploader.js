ZZ.Decorations.ImageUploader = CUORE.Class(CUORE.Decoration, {

    init: function(serviceurl) {
        this.serviceurl = serviceurl;
    },

    postPaint: function(panel) {
        var callback = function(url) {
                var event = 'COMPONENT_' + panel.id + '_CHANGED';
                CUORE.Bus.emit(event, url);
            };
        var drawImage = this._drawImage;
        var container = this.createUploaderContainer(panel);
        var data = ZZ.Helpers.Session.getAuthData();

        var uploader = new qq.FineUploader({
            element: document.getElementById("fineuploader-container"),
            request: {
                endpoint: 'images/upload/'+this.serviceurl,
                params: {
                    'username': data.userEmail,
                    'session_token': data.token
                }
            },
            multiple: false,
            text: {
                uploadButton: '<i class="icon-upload icon-white"></i>Upload a file'
            },
            template: '<div class="qq-uploader">' + '<pre class="qq-upload-drop-area"><span>{dragZoneText}</span></pre>' + '<div class="qq-upload-button zz-btn" style="width: auto;">{uploadButtonText}</div>' + '<span class="qq-drop-processing"><span class="hidden">{dropProcessingText}</span><span class="qq-drop-processing-spinner"></span></span>' + '<ul class="qq-upload-list hidden" style="margin-top: 10px; text-align: center;"></ul>' + '</div>',
            classes: {
                success: 'alert alert-success',
                fail: 'alert alert-error'
            },

            callbacks: {
                onComplete: function(id, fileName, responseJSON) {
                    if(responseJSON.success) {
                        drawImage(responseJSON.url, panel);
                        callback(responseJSON.url);
                    }
                }
            }
        });
    },

    createUploaderContainer: function(panel) {
        var input = panel.getElementsByTagName('input')[0];
        panel.removeChild(input);
        var container = document.createElement('span');
        container.id = "fineuploader-container";
        panel.appendChild(container);

        return container;
    },

    postUpdate: function(updatedata, panel) {
        if(!updatedata.value) return;
        this._drawImage(updatedata.value, panel);

    },

    _drawImage: function(url, panel) {
        var img = panel.getElementsByTagName('IMG');
        if(img && img[0]) {
            panel.removeChild(img[0]);
        }

        img = document.createElement('img');
        img.src = url;
        panel.appendChild(img);

    }

});
