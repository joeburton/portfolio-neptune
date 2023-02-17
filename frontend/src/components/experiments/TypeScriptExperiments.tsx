import styles from '../../css/TypeScriptExperiments.module.css';

export const TypeScriptExperiments = () => {
  enum PrintMedia {
    Newspaper = 'NEWSPAPER',
    Newsletter = 0,
    Magazine,
    Book = 'BOOK',
  }

  function getMedia(mediaName: string): PrintMedia {
    if (mediaName === 'Forbes' || mediaName === 'Outlook') {
      return PrintMedia.Magazine;
    }
    if (mediaName === 'Sun') {
      return PrintMedia.Newspaper;
    }
  }

  let mediaType: PrintMedia = getMedia('Forbes');

  console.log(mediaType);

  console.log(PrintMedia);

  enum CardinalDirection {
    North = 'N',
    East = 'E',
    South = 'S',
    West = 'W',
  }

  console.log(CardinalDirection.North);

  if ('N' === CardinalDirection.North) {
    console.log('Go North');
  }

  return <div className={styles.container}>TypeScript Experiments</div>;
};
