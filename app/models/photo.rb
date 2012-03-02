class Photo < ActiveRecord::Base

  mount_uploader :image, ImageUploader

  acts_as_taggable

  def shot_at
    (self.image.get_exif_tag('DateTimeOriginal').gsub(/(\d{4}):(\d{2}):(\d{2}) (\d{2}):(\d{2}):(\d{2})/, '\1-\2-\3 \4:\5:\6') rescue self.created_at).to_time
  end

  def shot_on
    self.shot_at.to_date
  end

end
