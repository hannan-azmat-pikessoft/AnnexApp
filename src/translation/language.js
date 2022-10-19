import LocalizedStrings from 'react-native-localization';
import { arabic } from './arabic';
import { english } from './english';

let Strings = new LocalizedStrings({
    "en-US": english,
    en: english,
    ar: arabic,
});

export default Strings;