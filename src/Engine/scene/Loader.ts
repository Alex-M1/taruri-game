/* eslint-disable no-dupe-class-members */
export default class Loader {
  loadedImages: Record<string, HTMLImageElement>;

  constructor() {
    this.loadedImages = {};
  }

  images(imagesFile: Record<string, string>): void
  images(name: string, src: string): void
  images(image: Record<string, string> | string, src?: string): void {
    if (typeof image === 'string') {
      console.log(1);
    } else {
      const promises = [];
      for (const name in image) {
        promises.push(this.loadImage(name, image[name]));
      }
      // return Promise.all(promises);
    }
  }

  load() {
    const promises = [];
    for (const name in this.imageFiles) {
      promises.push(this.loadImage(name, this.imageFiles[name]));
    }
    return Promise.all(promises);
  }

  private loadImage(name: string, src: string) {
    return new Promise((resolve) => {
      const image = new Image();
      this.loadedImages[name] = image;
      image.onload = () => resolve(name);
      image.src = src;
    });
  }
}
