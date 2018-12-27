import { Store } from 'react-native-nub';
import rootReducer from '../reducers';
/*  the "store" will look like so:
    {
        info: {
            version: string,
            releasedate: datetime
        },
        toast: {
            active: bool,
            message: string,
            duration: integer
        },
        current: {             
            game: int,
            turn: int,
			command: {
                cup: [],
                current: [],
                optional: [],
				delay: {}
			}
        }
    }
*/
const store = Store(rootReducer);

export default store;