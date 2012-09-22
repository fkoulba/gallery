// This is a manifest file that'll be compiled into including all the files listed below.
// Add new JavaScript/Coffee code in separate files in this directory and they'll automatically
// be included in the compiled file accessible from http://example.com/assets/application.js
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

$(function() {
  /*$('.thumbs_list .thumb a').click(function(e) {
    console.log('click', e);
    if (e.ctrlKey) {
        $(this).parents('.thumb').toggleClass('selected');
    } else {
        $('.thumbs_list .thumb').removeClass('selected');
    }
    return false;
  });*/

  /*$('.thumbs_list .thumb a').dblclick(function(e) {
    console.log('dblclick');
    window.location = $(this).attr('href');
    return false;
  });*/

  $('.thumbs_list').selectable();

  $('.tags_list .tag').droppable({
    drop: function(event, ui) {
      console.log('The square with ID "' + ui.draggable.data('photo_id') + '" was dropped onto me!');
      ui.draggable.draggable('disable');
      $(this).droppable('disable');
      ui.draggable.draggable('option', 'revert', false);
      ui.draggable.find('.tags').html($(this).html());
    }
  });

  $('.thumbs_list .thumb').draggable({
    containment: 'document',
    //helper: 'clone',
    helper: function() {
      var selected = $('.thumbs_list .thumb.selected');
      if (selected.length === 0) {
        selected = $(this);
      }
      var container = $('<ul />').attr('id', 'draggingContainer');
      container.append(selected.clone());
      return container;
    },
    cursor: 'move',
    revert: true
  });
});

