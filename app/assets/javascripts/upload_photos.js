$(function () {
  (function () {
    var filesUpload = $('#files-upload');
    var dropArea = $('#drop-area');
    var fileList = $('#file-list');

    var queue = [];
    var ready = true;

    var reader = new FileReader();
    var imageObj = new Image();
    var canvas = $('<canvas width="100" height="100" />');

    var thumbnailWidth = 100;
    var thumbnailHeight = 100;

    function generateThumbnails(files) {
      if (typeof files !== 'undefined') {
        for (var i = 0, l = files.length; i < l; i++) {
          var file = files[i];
          if ((/image/i).test(file.type)) {
            console.log(file);
            queue.push(file);
          }
        }
      }
    }

    setInterval(function() {
      if (ready && queue.length > 0) {
        ready = false;
        generateThumbnail(queue.shift());
      }
    }, 1000);

    function generateThumbnail(file) {
      var li = $('<li class="thumb"><div class="image"><img width="' + thumbnailWidth + '" height="' + thumbnailHeight + '" /></div><div class="title">' + file.name + '</div><div class="tags" /></li>');

      var img = li.find('img');

      if (typeof(reader) !== 'undefined') {
        reader.onload = function(event) {
          imageObj.onload = function() {
            canvas.get(0).getContext('2d').drawImage(imageObj, 0, 0, thumbnailWidth, thumbnailHeight);
            img.get(0).src = canvas.get(0).toDataURL();

            ready = true;

            imageObj.src = '';
            canvas.get(0).getContext('2d').clearRect(0, 0, thumbnailWidth, thumbnailHeight);
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


