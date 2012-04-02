class ImageUploader < CarrierWave::Uploader::Base

  include CarrierWave::MiniMagick

  storage :file

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  # Provide a default URL as a default if there hasn't been a file uploaded:
  # def default_url
  #   "/images/fallback/" + [version_name, "default.png"].compact.join('_')
  # end

  process :fix_exif_rotation
  process :strip
  process :convert => 'jpg'
  process :quality => 85
  process :capture_dimenstions_and_shot_at

  version :thumb do
    process :resize_to_fill => [100, 100]
  end

  def extension_white_list
    %w(jpg jpeg gif png)
  end

  def capture_dimenstions_and_shot_at
    model.image_width = get_image_attr('width')
    model.image_height = get_image_attr('height')
    model.shot_at = (get_exif_tag('DateTimeOriginal').gsub(/(\d{4}):(\d{2}):(\d{2}) (\d{2}):(\d{2}):(\d{2})/, '\1-\2-\3 \4:\5:\6').to_time rescue Time.now)
  end

  def get_image_attr(name)
    manipulate! do |img|
      return img[name]
    end
  end

  def get_exif_tag(name)
    get_image_attr('EXIF:' + name)
  end

end
