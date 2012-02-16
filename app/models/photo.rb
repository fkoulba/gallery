class Photo < ActiveRecord::Base

  mount_uploader :image, ImageUploader

  acts_as_taggable

end
