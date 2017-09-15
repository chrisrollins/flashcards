const util = (function(){

	const funcs = {
		getFunctionBody: function(f)
		{
			if(typeof(f) === "function")
			{
				const str = f.toString();
				const body = str.slice(str.indexOf("{") + 1, str.lastIndexOf("}"));
				return body;
			}
		},
		getDocumentElementsWithIDs: function()
		{
			const elements = [];
			const IDs = [];
			for(let el of document.all)
			{
				if(el.id !== "")
				{
					elements.push(el);
					IDs.push(el.id);
				}
			}
			return {elements: elements, IDs: IDs};
		},
		getPositionInParentElement: function(el)
		{
			let count = -1;
			const breakLimit = 10000;
			while(el !== null)
			{
				count++;
				el = el.previousElementSibling;
				if(count >= breakLimit)
				{
					return;
				}
			}
			return count;
		},
		array: function(arg)
		{
			if(!Array.isArray(arg))
				{ return [arg]; }
			return [...arg];
		},
		compareCaseInsensitive: function(word1, word2)
		{
			return word1.toLowerCase() === word2.toLowerCase();
		},
		chainDelay: function(ms)
		{
			const queue = [];
			repeat(0, ms);
			function repeat(i, delay)
			{
				setTimeout(function()
				{
					if(i < queue.length)
					{
						queue[i].callback();
						i++;
						repeat(i, queue[i].delay);
					}
				}, delay);
			}
			function chain(callback)
			{
				if(typeof callback === "function")
				{
					queue.push({callback: callback, delay: ms});
				}
				else if(typeof callback === "number")
				{
					ms = callback;
				}
				return chain;
			}
			return chain;
		}
	};

	const obj = Object.create(null);

	for(const func in funcs)
	{
		Object.defineProperty(obj, func,
		{
			get: function() { return funcs[func].bind(null); }
		});
	}

	return Object.freeze(obj);

})();