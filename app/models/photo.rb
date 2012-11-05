class Photo < ActiveRecord::Base

  mount_uploader :image, ImageUploader
  process_in_background :image

  acts_as_taggable

  def shot_on
    self.shot_at.to_date
  end

end
