class Photo < ActiveRecord::Base

  mount_uploader :image, ImageUploader

  acts_as_taggable

  def shot_on
    self.shot_at.to_date
  end

end
