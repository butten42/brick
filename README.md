## Arkanoid clone
### intro
At first it just a tutorial of MDN game design,as I learn more about canvas I found myself can do more so I desided to make a Arkanoid clone.here is what new feature I added gradually.
- more leavls
- openning cartoons
- game over cartoon/win cartoon
- different kind of bricks
- BGM and beeps
### reform
so I was decide to make a arkanoid just like it origin.
I need to:
- make more active **bgm**
	- op/ed 
	- begin stroke/lost ball
	- hit the brick beep/hit the wall beep/the med beep...
- more kinds of **bricks** 
	- gold bricks can't be destory
	- silver bricks can't be destory unless it's tooched twice
	- the white brick wont drop medicine...
	- there are different rate of drops
- more **tools**
	- random drops medicine
	- several kind of medicine take different of effect(eg: random shoot three balls)
    - each has different UI
- **enemy**
	- move from the top to the bottom can't go through the bricks
	- have few numbers depend on the levels
	- player can't touch those
- **scores**
	- make a score count system 
	- every enemy every brick and for each level up has a score bonus
- how to level up
	- a sample is just count the total scores.
- design more **levels**
### hard balls
#### how to make the ball reset after new turns
you see I was reset the main draw() function after it win I think everything should be reset just like first time game start but no it dosen;t the ball remain in the last position of last level.
I need to reset it's position at reset() function use it's coordinate  
**tips**: use the drawball() won't help

### log
2017/09/29  Reform the game with new brick/ball style new control adding sounds resource change the game over cartoon new game design

___
**tips**  
` git push --set-upstream origin master`