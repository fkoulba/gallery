$(function () {
  (function () {
    var filesUpload = $('#files-upload'),
      dropArea = $('#drop-area'),
      fileList = $('#file-list');

    function uploadFile(file) {
      var li = $('<li class="photo_thumb" />'),
        div = $('<div />'),
        img,
        progressBarContainer = $('<div />'),
        progressBar = $('<div />'),
        reader,
        xhr,
        fileInfo;

      li.append(div);

      progressBarContainer.addClass('progress-bar-container');
      progressBar.addClass('progress-bar');
      progressBarContainer.append(progressBar);
      li.append(progressBarContainer);

      /*
        If the file is an image and the web browser supports FileReader,
        present a preview in the file list
      */
      if (typeof FileReader !== 'undefined' && (/image/i).test(file.type)) {
        img = $('<img />');
        li.append(img);
        reader = new FileReader();
        reader.onload = (function (theImg) {
          return function (event) {
            theImg.attr('src', event.target.result);
            theImg.attr('width', 100);
          };
        }(img));
        reader.readAsDataURL(file);
      }

      /*// Uploading - for Firefox, Google Chrome and Safari
      xhr = new XMLHttpRequest();

      // Update progress bar
      xhr.upload.addEventListener('progress', function (event) {
        if (event.lengthComputable) {
          progressBar.css('width', (event.loaded / event.total) * 100 + '%');
        }
        else {
          // No data to calculate on
        }
      }, false);

      // File uploaded
      xhr.addEventListener('load', function () {
        progressBarContainer.addClass('uploaded');
        progressBar.html('Uploaded!');
      }, false);

      xhr.open('post', 'upload/upload.php', true);

      // Set appropriate headers
      xhr.setRequestHeader('Content-Type', 'multipart/form-data');
      xhr.setRequestHeader('X-File-Name', file.fileName);
      xhr.setRequestHeader('X-File-Size', file.fileSize);
      xhr.setRequestHeader('X-File-Type', file.type);

      // Send the file (doh)
      xhr.send(file);*/

      // Present file info and append it to the list of files
      fileInfo = '<div><strong>Name:</strong> ' + file.name + '</div>';
      fileInfo += '<div><strong>Size:</strong> ' + parseInt(file.size / 1024, 10) + ' kb</div>';
      fileInfo += '<div><strong>Type:</strong> ' + file.type + '</div>';
      div.innerHTML = fileInfo;

      fileList.append(li);
    }

    function traverseFiles(files) {
      if (typeof files !== 'undefined') {
        for (var i=0, l=files.length; i<l; i++) {
          uploadFile(files[i]);
        }
      }
      else {
        fileList.innerHTML = 'No support for the File API in this web browser';
      }
    }

    filesUpload.bind('change', function () {
      traverseFiles(this.files);
    });

    dropArea.bind({
      dragleave: function (event) {
        var target = event.target;

        if (target && target === dropArea) {
          $(this).removeClass('over');
        }
        return false;
      },

      dragenter: function (event) {
        $(this).addClass('over');
        return false;
      },

      dragover: function (event) {
        return false;
      },

      drop: function (event) {
        traverseFiles(event.originalEvent.dataTransfer.files);
        $(this).removeClass('over');
        return false;
      }
    });
  })();
});


