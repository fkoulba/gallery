$(function () {
  (function () {
    var filesUpload = $('#files-upload');
    var dropArea = $('#drop-area');
    var fileList = $('#file-list');

    var queue = [];
    var ready = true;

    var reader = new FileReader();
    var imageObj = new Image();

    function generateThumbnails(files) {
      if (typeof files !== 'undefined') {
        for (var i = 0, l = files.length; i < l; i++) {
          queue.push(files[i]);
          console.log(i);
        }
      } else {
        fileList.innerHTML = 'No support for the File API in this web browser';
      }
    }

    setInterval(function() {
      console.log('check');
      if (ready && queue.length > 0) {
        ready = false;
        console.log('start', queue.length);
        generateThumbnail(queue.shift());
      }
    }, 1000);

    function generateThumbnail(file) {
      var canvas = $('<canvas width="100" height="100" />');

      var li = $('<li class="photo_thumb" />');

      var img = $('<img width="100" height="100" />');

      if (typeof FileReader !== 'undefined' && (/image/i).test(file.type)) {
        li.append(img);

        reader.onload = function(event) {
          imageObj.onload = function() {
            canvas.get(0).getContext('2d').drawImage(imageObj, 0, 0, 100, 100);
            ready = true;
            imageObj.src = '';

            img.get(0).src = canvas.get(0).toDataURL();
          };
          imageObj.src = event.target.result;
        };
        reader.readAsDataURL(file);
      }

      fileList.append(li);
    }

    filesUpload.bind('change', function () {
      generateThumbnails(this.files);
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
        generateThumbnails(event.originalEvent.dataTransfer.files);
        $(this).removeClass('over');
        return false;
      }
    });
  })();
});


