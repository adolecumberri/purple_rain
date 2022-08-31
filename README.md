
# Purple rain



The Purple Rain is encapsulated in a function which receives a Canvas and does the rest automatically.

The function returns 2 functions to update the canvas and the drops.


## Rain "API"

####  createRainOnCanvas Parameters

| Parameter | Type     | defaultValue | Description                      |
| :-------- | :------- | :------------|:-------------------------------- |
| `canvas` | `HTMLCanvasElement` | `undefined` | **Required**. Canvas Element |
| `backgroundColor` | `Color` | `#151515` | Color for the canvas background |
| `dropColor` | `Color` | `#ba55d3` |drop Color |
| `dropsAmount` | `number` | 5000 |number of rain drops in screen |


#### createRainOnCanvas Return
```
updateColor
```

| Parameter | Type     | defaultValue | Description                       |
| :-------- | :------- | :------------|:-------------------------------- |
| `backgroundColor`      | `Color` | bgColor (actual value) | changes background color |
| `dropColor`      | `Color` | rainDropColor (actual value) | changes drop color |

```
updateStats
```

| Parameter | Type     | defaultValue | Description                       |
| :-------- | :------- | :------------|:-------------------------------- |
| `newFallRate`| `number` | fallRate | changes Falling speed |
| `newMaxDropHeight`| `number` | maxDropHeight | changes drop Length |
| `newMaxDropWidth`| `number` | maxDropWidth | changes drop Weight |
| `newMaxDropDepth`| `number` | maxDropDepth | changes drop Z perspective |
| `newMomentumGain`| `number` | momentumGain | changes drop Aceleration |
| `newZdepthMomentumModifier`| `number` | zdepthMomentumModifier | changes drop aceleration depending on Z value |
| `newWindSpeed` | `number` | windSpeed | changes Wind variable |


















## Usage

```javascript
Run the HTML.
```


## Screenshots

<img src="/example1.PNG" alt="ex2"/>
<img src="/example2.PNG" alt="ex2"/>

## References:

https://codepen.io/Bloodyaugust/pen/qqQzzX

https://www.youtube.com/watch?v=KkyIDI6rQJI&ab_channel=TheCodingTrain
