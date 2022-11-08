// export default class Loader {
//   imageFiles: Record<string, string>;
//   images: Record<string, HTMLImageElement>;
//   constructor(imageFiles: any) {
//     this.imageFiles = imageFiles;
//     this.images = {};
//   }

//   load() {
//     const promises = [];
//     for (const name in this.imageFiles) {
//       promises.push(this.loadImage(name, this.imageFiles[name]));
//     }
//     return Promise.all(promises);
//   }

//   private loadImage(name: string, src: string) {
//     return new Promise((resolve) => {
//       const image = new Image();
//       this.images[name] = image;
//       image.onload = () => resolve(name);
//       image.src = src;
//     });
//   }
// }

export default class Loader {
  private imagesObj: Record<string, HTMLImageElement | undefined>;

  constructor() {
    this.imagesObj = {};
  }

  getImage(name: string) {
    return this.imagesObj[name];
  }

  get images() {
    return this.imagesObj;
  }

  setImage({ name, image }: { name: string, image: HTMLImageElement }) {
    this.imagesObj[name] = image;
  }

  loadImage(name: string, src: string) {
    const image = new Image();
    image.src = src;

    this.imagesObj[name] = image;
  }
}
