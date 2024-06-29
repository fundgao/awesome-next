import OpenAI from 'openai';

/**
 * AIGC 学习: https://platform.openai.com/docs/introduction
 * 
 * openai models: https://platform.openai.com/docs/models
 * 
 * openai api-keys: https://platform.openai.com/account/api-keys
 * 
 * 在大语言模型中，通常涉及到三种角色：用户（user）、助手（assistant）和系统（system）。它们的区别在于其在对话或交互过程中扮演的角色和功能。
 * 
 * 用户（user）：
 * 用户是指与系统进行交互的个体或实体，通常是真实的人类用户或其他系统。
 * 用户通过输入文本、语音或其他形式与系统进行沟通，提出问题、请求信息或执行操作。
 * 
 * 助手（assistant）：
 * 助手是一种程序或系统组件，设计用来协助用户完成特定的任务、获取信息或提供服务。
 * 助手通常具有自然语言处理能力，能够理解用户的输入，并根据输入提供相应的反馈、建议或执行操作。
 * 
 * 系统（system）：
 * 系统是指整个大语言模型或者其中的某个部分，负责处理用户输入并生成相应的输出。
 * 系统可以包括多个组件，如语言理解模块、对话管理模块和语言生成模块等，用于处理不同层面的任务和功能。
 * 
 * 在对话系统或交互式应用中，用户、助手和系统之间的交互通常是动态的和复杂的。
 * 用户向系统提出问题或请求，助手解释用户的意图并向系统传达，系统根据用户的输入和上下文生成相应的响应，并通过助手传达给用户。
 * 整个过程可能涉及到自然语言理解、对话管理、知识检索、信息生成等多个环节。
 */

export enum OPENAI_MODEL {
    gpt35t = 'gpt-3.5-turbo',
    gpt4 = 'gpt-4'
}

export enum SYSTEM_ROLE {
    Grammar_correction = 'You will be provided with statements, and your task is to convert them to standard English.',
    Tweet_classifier = 'You will be provided with a tweet, and your task is to classify its sentiment as positive, neutral, or negative.',
    Pa_chong = '这是一个电影列表的html片段，需要获取需要的电影名(name)，封面链接(picture)，简介(info)，评分(score)，评论人数(commentsNumber)。请使用括号的单词作为属性名，以JSON对象数组的格式返回。'
}

export default function Page() {
    const openai = new OpenAI({
        apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
        baseURL:'https://api.chatanywhere.tech/v1',
    });

    const askAI = async (content: string) => {
        const completion = await openai.chat.completions.create({
            model: OPENAI_MODEL.gpt35t,
            messages: [
                // 角色
                {
                    role: "system", // assistant function system tool user
                    content: SYSTEM_ROLE.Grammar_correction
                },
                // 限定
                { role: "assistant", content: "The Los Angeles Dodgers won the World Series in 2020."},
                { role: 'user', content }
            ],
            temperature: 0.7,
            max_tokens: 64,
            top_p: 1,
        });
        console.log(completion.choices[0]);
    }

    return (<div>
        AIGC 学习: https://platform.openai.com/docs/introduction
    </div>)
}