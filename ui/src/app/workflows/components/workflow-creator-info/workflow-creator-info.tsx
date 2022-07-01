import * as React from 'react';
import * as models from '../../../../models';
import {labels} from "../../../../models";

require('./workflow-creator-info.scss');

interface WorkflowCreatorInfoProps {
    workflow: models.Workflow;
    onChange: (key: string, value: string) => void;
}

export class WorkflowCreatorInfo extends React.Component<WorkflowCreatorInfoProps, {}> {
    constructor(props: WorkflowCreatorInfoProps) {
        super(props);
    }

    public render() {
        const w = this.props.workflow;
        const creatorLabels = [];
        const creatorKeys = new Map<string, string>([
            [labels.creator, w.metadata.labels[labels.creator]],
            [labels.creatorEmail, w.metadata.labels[labels.creatorEmail]],
            [labels.creatorPreferredUsername, w.metadata.labels[labels.creatorPreferredUsername]]
        ]);
        creatorLabels.push(
            Object.entries(creatorKeys).map(([key, value]) => (
                <div
                    title={`List workflows created by ${key}=${value}`}
                    className='tag'
                    key={`${w.metadata.uid}-${key}`}
                    onClick={async e => {
                        e.preventDefault();
                        this.props.onChange(key, value);
                    }}>
                    <div className='key'>{key}</div>
                    <div className='value'>{value}</div>
                </div>
            ))
        );

        return <div className='wf-row-creator-labels'>{creatorLabels}</div>;
    }
}
