import { uid } from './utils';

const publicComponents = [
	{
		id: uid(),
		title: 'Consequat interdum varius',
		isPublic: true,
		content: `
			<h2>Consequat interdum varius</h2>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Illud non continuo, ut aeque incontentae. An tu me de L. <b>At multis se probavit.</b> Hoc loco tenere se Triarius non potuit. Duo Reges: constructio interrete. </p>
			<figure class="image image-style-side">
				<img src="https://ckeditor.com/assets/images/bg/umbrellas-e935d5c582.jpg" />
				<figcaption>Some caption</figcaption>
			</figure>
			<ol>
				<li>
					Habes, inquam, Cato,
					<comment id="thread-1" type="start"></comment>
						formam eorum, de quibus loquor,
					<comment id="thread-1" type="end"></comment>
					philosophorum.</li>
			</ol>
			<blockquote cite="http://loripsum.net">
				Si enim idem dicit, quod Hieronymus, qui censet summum bonum esse sine ulla molestia vivere, cur mavult dicere voluptatem quam vacuitatem doloris, ut ille facit, qui quid dicat intellegit?
			</blockquote>
		`,
	},
	{
		id: uid(),
		title: 'Sed haec omittamus',
		isPublic: true,
		content: `
			<h2>Sed haec omittamus</h2>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
			<comment id="thread-1" type="start"></comment>
				Sit enim idem caecus, debilis.
			<comment id="thread-1" type="end"></comment>
			<b>Sed fortuna fortis;</b> Respondent extrema primis, media utrisque, omnia omnibus. Primum Theophrasti, Strato, physicum se voluit; </p>
			<ol>
				<li>Naturales divitias dixit parabiles esse, quod parvo esset natura contenta.</li>
				<li>Quis, quaeso, illum negat et bonum virum et comem et humanum fuisse?</li>
			</ol>
		`,
	},
	{
		id: uid(),
		title: 'Aufert enim sensus',
		isPublic: true,
		content: `
			<h2>Aufert enim sensus</h2>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. De illis, cum volemus. Aperiendum est igitur, quid sit voluptas; Simus igitur contenti his. Age, inquies, ista parva sunt. </p>
			<ol>
				<li>Ab hoc autem quaedam non melius quam veteres, quaedam omnino relicta.</li>
				<li>Nec mihi illud dixeris:
					<comment id="thread-1" type="start"></comment>
						formam eorum, de quibus loquor,
					<comment id="thread-1" type="end"></comment>
					mihi sunt voluptati, et erant illa Torquatis.
				</li>
			</ol>
		`,
	},
	{
		id: uid(),
		title: 'Hoc est non dividere',
		isPublic: true,
		content: `
			<h2>Hoc est non dividere</h2>
			<ol>
				<li>Aliena dixit in physicis nec ea ipsa, quae tibi probarentur;</li>
				<li>Est igitur officium eius generis,
					<comment id="thread-1" type="start"></comment>
						formam eorum, de quibus loquor,
					<comment id="thread-1" type="end"></comment>
					ponatur nec in contrariis.
				</li>
			</ol>
		`,
	}
];

const collaborationData = {
	users: [
		{
			id: 'user-1',
			name: 'Joe Doe',
			// Note that the avatar is optional.
			avatar: 'https://randomuser.me/api/portraits/thumb/men/26.jpg'
		},
		{
			id: 'user-2',
			name: 'Ella Harper',
			avatar: 'https://randomuser.me/api/portraits/thumb/women/65.jpg'
		}
	],

	// The ID of the current user.
	userId: 'user-1',

	// Comment threads data.
	commentThreads: [
		{
			threadId: 'thread-1',
			comments: [
				{
					commentId: 'comment-1',
					authorId: 'user-1',
					content: '<p>Are we sure we want to use a made-up disorder name?</p>',
					createdAt: new Date( '09/20/2018 14:21:53' )
				},
				{
					commentId: 'comment-2',
					authorId: 'user-2',
					content: '<p>Why not?</p>',
					createdAt: new Date( '09/21/2018 08:17:01' )
				}
			]
		}
	]
};

export {
	publicComponents,
	collaborationData
}
