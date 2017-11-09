## Inc 5000 2007-2017

### Introduction

This project is WPI CS573 Data Visualization course project, intended to visualize annual list of fastest growing private companies from 2007 to 2017 using D3.js. A short video can be found [here].

### Data Source

The data source of this project is from data.world – INC 5000 2017, which includes information of fastest growing private companies in past 10 years. [[Downloadable CSV]](https://data.world/aurielle/inc-5000-10-years)

### Description of Visualization and Interactions

This visualization mainly contains four parts: (1) The year slider below the title represents each year between 2007 to 2017. (2) Tooltips of information of each region will show when hovering on each bubble on the map. (3) The drop down menu on the right panel represents the industries of these companies. (4) The selection box below the drop down menu.

In the year slider panel, users can choose different years between 2007 and 2017 by clicking and sliding the dot on the slider.

The tooltips shows the name, industry, year, revenue, headcount of each region. Users can see the information by hovering on each bubble on the map. Since we want to show the geographical information, we merged companies within an area as a bubble, and the size of each bubble represents the relative size of each index. 

The drop down menu includes all the industries of these private companies. By clicking the menu and choosing different industries, the bubbles and tooltips on the map will change according to users’ choice.

The selection box allows users to select the index they wat to analyze by clicking the dot on the left side of each industry. Then the corresponding information will show on the map.

### Discussions

This project is intended to analyze following questions:

1.	Where are the richest companies established? Or, which part of the country has most vitality? 

To answer this question, I compared the headcounts and revenues of different years and different industries. I found that different industries distribute in different regions, and as the years change, different industries have different development trends. For example, in 2007, the main distribution area of Manufacture industry is the Five Great Lake area, and the main distribution area of Government Services industry is Washington DC area. In addition, as years past, the main distribution area of Manufacture industry shifted eastward, but for Government Services industry, Washington DC is still the center. 

<p align="center">
  <img width="756" alt="figure 1" src="https://user-images.githubusercontent.com/22625392/32587936-74645e00-c4d9-11e7-9589-c4eb79122e09.PNG">
</p>

It should be noticed that, to compare the revenues and the headcounts of different industries, not only need to compare the size of bubbles, but also the legend of the bubbles that is marked on the right corner beside the map.  

2.	For a company, is there any correlation between growth and revenue?

I have plotted two scatter plots about the correlation between growth and revenue of every industry.  The first one is about all the growth and revenue values of these companies within the 10 years. Then, to see the relationship between the two aspects more clearly, I optimized the first plot by removing some of the extreme boundary values and got the second plot. From the two plots, we can draw the conclusion that for a company, the larger the revenue value, the slower the growth rate. 

<p align="center">
  <img width="787" alt="figure 2" src="https://user-images.githubusercontent.com/22625392/32587976-afe939be-c4d9-11e7-893d-3dfe4ca9f16b.PNG">
</p>

3.	Timeline of the development of a given industry?

As mentioned earlier, different companies will show different development trends as years past. Using Software industry as an example, after 2011, the overall revenue of Software industry is on the rise. Although through 2012-2013, the revenues of these Software companies has declined, we thought it may be caused by reason that when the revenue reaches a certain level, the growth rate slowed down, as we talked earlier. Here we also need to notice the legend of the bubbles among different years.

<p align="center">
  <img width="529" alt="figure 3" src="https://user-images.githubusercontent.com/22625392/32588021-01c32b78-c4da-11e7-975d-866a5bc29f34.PNG">
</p>

### Conclusion

In this project, the development trend of fastest growing private companies from 2007 to 2017 are explored, including their geographical changes, revenue changes, headcount changes and the correlation of headcount and revenue. There are four interaction panels that can provide users the information of companies within each region, and also help users to filter the year, industry and index.
