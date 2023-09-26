import { Input } from 'antd';
import { useState } from 'react';

import { useDisplayBoardQueryKey, useProjectIdInUrl } from './util';
import { Container } from '@/screens/displayBoard/displayBoardColumn';
import { useAddDisplayBoard } from '@/utils/hooks/displayBoard';

/**
 * @author meng
 * @version 1.0
 * * @date 2022/04/04
 * @file 创建DisplayBoar看板页面
 */

export const CreateDisplayBoard = () => {
    const [name, setName] = useState('');
    //获取项目id
    const projectId = useProjectIdInUrl();

    const { mutateAsync: addDsiplayBoard } = useAddDisplayBoard(useDisplayBoardQueryKey());
    const submit = async () => {
        await addDsiplayBoard({ name, projectId });
        setName('');
    };
    return (
        <Container>
            <Input
                size='large'
                placeholder='新建看板名称'
                onPressEnter={submit}
                value={name}
                onChange={evt => setName(evt.target.value)}
            />
        </Container>
    );
};
