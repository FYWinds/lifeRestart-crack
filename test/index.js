import { readFile } from 'fs/promises';
import Life from '../src/life.js'

global.json = async fileName => JSON.parse(await readFile(`data/${fileName}.json`));

async function debug() {

    const life = new Life();
    await life.initial();

    life.restart({
        CHR: 99999, // 颜值 charm CHR
        INT: 99999, // 智力 intelligence INT
        STR: 99999, // 体质 strength STR
        MNY: 99999, // 家境 money MNY
        SPR: 99999, // 快乐 spirit SPR
        TLT: [1004, 1005, 1009, 1048], // 天赋 talent TLT
    });
    const lifeTrajectory = [];
    let trajectory;
    do {
        try {
            trajectory = life.next();
        } catch (e) {
            console.error(e);
            // debugger
            throw e;
        }
        lifeTrajectory.push(lifeTrajectory);
        const { age, content } = trajectory;
        console.debug(
            `---------------------------------`,
            `\n-- ${age} 岁\n   `,
            content.map(
                ({ type, description, rate, name, postEvent }) => {
                    switch (type) {
                        case 'TLT':
                            return `天赋【${name}】发动：${description}`;
                        case 'EVT':
                            return description + (postEvent ? `\n    ${postEvent}` : '');
                    }
                }
            ).join('\n    ')
        );
    } while (!trajectory.isEnd)
    // debugger;
}

debug();