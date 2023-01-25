import { Request, Response } from 'express';

const setCookie = (req: Request, res: Response, next: Function) => {
  // check if client sent cookie
  var cookie = req.cookies.BLUE_MOON;
  if (cookie === undefined) {
    // now: set a new cookie
    var randomNumber = Math.random().toString();
    randomNumber = randomNumber.substring(2, randomNumber.length);
    res.cookie('BLUE_MOON', randomNumber, {
      maxAge: 900000,
      httpOnly: false,
    });
    console.log('cookie created successfully');
  } else {
    // yes, cookie was already present
    console.log('cookie exists', cookie);
  }
  next(); // <-- important!
};

export default setCookie;
