class Photo < ActiveRecord::Base
  has_attached_file :image, :styles => { :thumb => "100x100>" }

  validates_attachment_presence :image
  validates_attachment_content_type :image, :content_type => ['image/jpeg', 'image/png']

  acts_as_taggable

end
