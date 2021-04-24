// Generate Suites lol

const suite_generation = document.getElementById("suite-canvas");
const suite_generator = suite_generation.getContext("2d");

function generateSuite (array) {
  const das_array = JSON.parse(array);
  console.log(das_array);

  suite_generator.clearRect(0, 0, suite_generation.width, suite_generation.height);
  
  console.log(das_array[0]);

  const das_array_length = das_array.length / 2;

  suite_generator.clearRect(0, 0, suite_generation.width, suite_generation.height);

  for (i = 0; i < das_array_length; i++) {
    console.log("One cycle completed.");
    console.log(das_array[i].x);

    const das_array_x = das_array[i].x;
    const das_array_y = das_array[i].y;
    const das_array_width = das_array[i].width;
    const das_array_height = das_array[i].height;
    const das_array_src = das_array[i].src;

    const sprite = new Image();

    sprite.onload = function () {
      suite_generator.drawImage(sprite, parseInt(das_array_x), parseInt(das_array_y), parseInt(das_array_width), parseInt(das_array_height));
    }

    sprite.src = String(das_array_src);
  }
}