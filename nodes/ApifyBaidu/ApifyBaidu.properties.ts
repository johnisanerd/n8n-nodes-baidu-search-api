import { IExecuteFunctions, INodeProperties } from 'n8n-workflow';

/**
 * Build the Apify Actor input from node parameters.
 * Only the real Actor inputs are sent; the Output / Fields parameters shape the
 * data we return, they are not part of the Actor input.
 */
export function buildActorInput(
	context: IExecuteFunctions,
	itemIndex: number,
	defaultInput: Record<string, any>,
): Record<string, any> {
	return {
		...defaultInput,
		query: context.getNodeParameter('query', itemIndex),
		device: context.getNodeParameter('device', itemIndex),
		num_results: context.getNodeParameter('num_results', itemIndex),
		max_pagination: context.getNodeParameter('max_pagination', itemIndex),
	};
}

const resourceProperties: INodeProperties[] = [
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Search Result',
				value: 'searchResult',
			},
		],
		default: 'searchResult',
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['searchResult'],
			},
		},
		options: [
			{
				name: 'Search',
				value: 'search',
				action: 'Search and return organic results',
				description: 'Search and return one item per organic result',
			},
		],
		default: 'search',
	},
];

const actorProperties: INodeProperties[] = [
	{
		displayName: 'Search Query',
		name: 'query',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. python tutorial',
		description: 'The query to search for',
		displayOptions: { show: { resource: ['searchResult'], operation: ['search'] } },
	},
	{
		displayName: 'Device',
		name: 'device',
		type: 'options',
		options: [
			{ name: 'Desktop', value: 'desktop' },
			{ name: 'Mobile', value: 'mobile' },
			{ name: 'Tablet', value: 'tablet' },
		],
		default: 'desktop',
		description: 'Which device profile to emulate for the search',
		displayOptions: { show: { resource: ['searchResult'], operation: ['search'] } },
	},
	{
		displayName: 'Results per Page',
		name: 'num_results',
		type: 'number',
		default: 10,
		typeOptions: { minValue: 1 },
		description: 'How many results to request per page',
		displayOptions: { show: { resource: ['searchResult'], operation: ['search'] } },
	},
	{
		displayName: 'Maximum Pages',
		name: 'max_pagination',
		type: 'number',
		default: 3,
		typeOptions: { minValue: 1 },
		description: 'How many result pages to fetch',
		displayOptions: { show: { resource: ['searchResult'], operation: ['search'] } },
	},
];

const outputProperties: INodeProperties[] = [
	{
		displayName: 'Output',
		name: 'output',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['searchResult'], operation: ['search'] } },
		options: [
			{
				name: 'Raw',
				value: 'raw',
				description: 'Return every field the API produces for each result',
			},
			{
				name: 'Selected Fields',
				value: 'selected',
				description: 'Choose exactly which fields to return',
			},
			{
				name: 'Simplified',
				value: 'simplified',
				description: 'Return a compact set of the most useful result fields',
			},
		],
		default: 'simplified',
		description: 'How much data to return for each result',
	},
	{
		displayName: 'Fields to Include',
		name: 'fields',
		type: 'multiOptions',
		displayOptions: {
			show: { resource: ['searchResult'], operation: ['search'], output: ['selected'] },
		},
		options: [
			{ name: 'Link', value: 'link' },
			{ name: 'Position', value: 'position' },
			{ name: 'Snippet', value: 'snippet' },
			{ name: 'Title', value: 'title' },
		],
		default: ['position', 'title', 'link', 'snippet'],
		description: 'Which fields to return when Output is set to Selected Fields',
	},
];

const authenticationProperties: INodeProperties[] = [
	{
		displayName: 'Authentication',
		name: 'authentication',
		type: 'options',
		options: [
			{
				name: 'API Key',
				value: 'apifyApi',
			},
			{
				name: 'OAuth2',
				value: 'apifyOAuth2Api',
			},
		],
		default: 'apifyApi',
		description: 'Choose which authentication method to use',
	},
];

export const properties: INodeProperties[] = [
	...resourceProperties,
	...actorProperties,
	...outputProperties,
	...authenticationProperties,
];
