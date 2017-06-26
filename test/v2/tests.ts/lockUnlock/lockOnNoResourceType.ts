import { Test } from '../Type'
import { v2 } from '../../../../lib/index.js'
import { starter, lockResource } from './.createFiles'

export default ((info, isValid) =>
{
    const server = info.init(1);
    
    starter(server, info, isValid, 'noResource', 0, true, (lock) => {
        lockResource(server, info, isValid, 'noResource', 0, true, v2.HTTPCodes.Locked, (lock) => {
            isValid(true);
        })
    })

}) as Test;
