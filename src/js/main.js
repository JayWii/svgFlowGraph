function main() {
    if (!mxClient.isBrowserSupported()) {
        mxUtils.error('Browser is not supported!', 200, false);
    } else {
        var container = document.getElementById('graphContainer');

        container.style.overflow = 'hidden';
        container.style.position = 'relative';
        container.style.width = '100%';
        container.style.height = '650px';
        container.style.background = 'url(\'./src/img/grid.gif\')';
        container.style.cursor = 'default';

        var graph = new mxGraph(container);

        graph.setConnectable(true);
				graph.connectionHandler.createTarget = true;

				graph.createHandler = function(state)
				{
					if (state != null &&
						this.model.isVertex(state.cell))
					{
						return new mxVertexToolHandler(state);
					}

					return mxGraph.prototype.createHandler.apply(this, arguments);
				};

        var parent = graph.getDefaultParent();

        // Enables rubberband selection
        new mxRubberband(graph);
        // Highlights the vertices when the mouse enters
        var highlight = new mxCellTracker(graph, '#70BEF5');
        // Creates the default style for vertices
        graph.getStylesheet().putDefaultVertexStyle(verStyle);

        // Creates the default style for edges
        graph.getStylesheet().putDefaultEdgeStyle(edgeStyle);

        //为元素添加边缘可连接的点
        graph.setConnectable(true);

        graph.getAllConnectionConstraints = function(terminal)
        {
        	if (terminal != null && this.model.isVertex(terminal.cell))
        	{
        		return [
        			new mxConnectionConstraint(new mxPoint(0, 0), true),
        			new mxConnectionConstraint(new mxPoint(0.5, 0), true),
        			new mxConnectionConstraint(new mxPoint(1, 0), true),
        			new mxConnectionConstraint(new mxPoint(0, 0.5), true),
        			new mxConnectionConstraint(new mxPoint(1, 0.5), true),
        			new mxConnectionConstraint(new mxPoint(0, 1), true),
        			new mxConnectionConstraint(new mxPoint(0.5, 1), true),
        			new mxConnectionConstraint(new mxPoint(1, 1), true)
        		];
        	}
        	return null;
        };

        // Disables floating connections
        graph.connectionHandler.isConnectableCell = function(cell)
        {
        	 return false;
        };
        mxEdgeHandler.prototype.isConnectableCell = function(cell)
        {
        	return graph.connectionHandler.isConnectableCell(cell);
        };

        graph.getModel().beginUpdate();

        var v1 = graph.insertVertex(parent, null, 'Hello,', 20, 20, 150, 60);
        var v2 = graph.insertVertex(parent, null, 'World!', 200, 150, 150, 60);
        var e1 = graph.insertEdge(parent, null, '', v1, v2,'edgeStyle=orthogonalEdgeStyle;');

        graph.getModel().endUpdate();


        // 判断被拖动的元素是否进入到图表区域
        function containsElt(graph, elt)
        {
          while (elt != null)
          {
            if (elt == graph.container)
            {
              return true;
            }
            elt = elt.parentNode;
          }
          return false;
        };

        // 在鼠标放开的坐标点放置矩形
        var funct = function(graph, evt, target, x, y)
        {
          var cell = new mxCell('new', new mxGeometry(0, 0, 120, 40),'');
          cell.setVertex(true);
          var cells = graph.importCells([cell], x, y, target);

          if (cells != null && cells > 0)
          {
            graph.scrollCellToVisible(cells[0]);
            graph.setSelectionCells(cells);
          }
        };
        // 在鼠标放开的坐标点放置圆角矩形
        var funct1 = function(graph, evt, target, x, y)
        {
          var cell = new mxCell('new', new mxGeometry(0, 0, 120, 40),'rounded=true;arcSize=20');
          cell.vertex = true;
          var cells = graph.importCells([cell], x, y, target);

          if (cells != null && cells > 0)
          {
            graph.scrollCellToVisible(cells[0]);
            graph.setSelectionCells(cells);
          }
        };
        // 在鼠标放开的坐标点放置椭圆
        var funct2 = function(graph, evt, target, x, y)
        {
          var cell = new mxCell('new', new mxGeometry(0, 0, 100, 60),'shape=ellipse');
          cell.vertex = true;
          var cells = graph.importCells([cell], x, y, target);

          if (cells != null && cells > 0)
          {
            graph.scrollCellToVisible(cells[0]);
            graph.setSelectionCells(cells);
          }
        };
        // 在鼠标放开的坐标点放置菱形
        var funct3 = function(graph, evt, target, x, y)
        {
          var cell = new mxCell('new', new mxGeometry(0, 0, 120, 60),'shape=rhombus');
          cell.vertex = true;
          var cells = graph.importCells([cell], x, y, target);

          if (cells != null && cells > 0)
          {
            graph.scrollCellToVisible(cells[0]);
            graph.setSelectionCells(cells);
          }
        };
        // 在鼠标放开的坐标点放置平行四边形
        var funct4 = function(graph, evt, target, x, y)
        {
          var cell = new mxCell('Text', new mxGeometry(0, 0, 120, 60),'shape=swimlane');
          cell.vertex = true;
          var cells = graph.importCells([cell], x, y, target);

          if (cells != null && cells > 0)
          {
            graph.scrollCellToVisible(cells[0]);
            graph.setSelectionCells(cells);
          }
        };
        // 在鼠标放开的坐标点放置Text
        var funct5 = function(graph, evt, target, x, y)
        {
          var cell = new mxCell('Text', new mxGeometry(0, 0, 60, 30),'shape=connector');
          cell.vertex = true;
          var cells = graph.importCells([cell], x, y, target);

          if (cells != null && cells > 0)
          {
            graph.scrollCellToVisible(cells[0]);
            graph.setSelectionCells(cells);
          }
        };

        // 在元素放置前创建元素边缘预览
				var dragElt = document.createElement('div');
				dragElt.style.border = 'dashed black 1px';
				dragElt.style.width = '120px';
				dragElt.style.height = '40px';

        var img = document.getElementsByTagName('img')[0]
        var img1 = document.getElementsByTagName('img')[1]
        var img2 = document.getElementsByTagName('img')[2]
        var img3 = document.getElementsByTagName('img')[3]
        var img4 = document.getElementsByTagName('img')[4]
        var img5 = document.getElementsByTagName('img')[5]

        var ds = mxUtils.makeDraggable(img, graph, funct, dragElt, null, null, graph.autoscroll, true);
        var ds1 = mxUtils.makeDraggable(img1, graph, funct1, dragElt, null, null, graph.autoscroll, true);
        var ds2 = mxUtils.makeDraggable(img2, graph, funct2, dragElt, null, null, graph.autoscroll, true);
        var ds3 = mxUtils.makeDraggable(img3, graph, funct3, dragElt, null, null, graph.autoscroll, true);
        var ds4 = mxUtils.makeDraggable(img4, graph, funct4, dragElt, null, null, graph.autoscroll, true);
        var ds5 = mxUtils.makeDraggable(img5, graph, funct5, dragElt, null, null, graph.autoscroll, true);

        // 当元素放置在了绘图区外时重置元素
				ds.createDragElement = mxDragSource.prototype.createDragElement;
        ds1.createDragElement = mxDragSource.prototype.createDragElement;
        ds2.createDragElement = mxDragSource.prototype.createDragElement;
        ds3.createDragElement = mxDragSource.prototype.createDragElement;
        ds4.createDragElement = mxDragSource.prototype.createDragElement;
        ds5.createDragElement = mxDragSource.prototype.createDragElement;

        // 禁用浏览器自带右键菜单
        mxEvent.disableContextMenu(document.body);

        // 创建下拉菜单
        new mxRubberband(graph);

        // 设置自动扩大鼠标悬停
        graph.panningHandler.autoExpand = true;

        // 覆写右键单击事件
        graph.panningHandler.factoryMethod = function(menu, cell, evt)
        {
            menu.addItem('你的鼠标右键被我接管了', null, function()
            {
                alert('然而并没有什么卵用');
            });
        };

    }
};

function mxVertexToolHandler(state)
{
  mxVertexHandler.apply(this, arguments);
};

mxVertexToolHandler.prototype = new mxVertexHandler();
mxVertexToolHandler.prototype.constructor = mxVertexToolHandler;

mxVertexToolHandler.prototype.domNode = null;

mxVertexToolHandler.prototype.init = function()
{
  mxVertexHandler.prototype.init.apply(this, arguments);

  this.domNode = document.createElement('div');
  this.domNode.style.position = 'absolute';
  this.domNode.style.whiteSpace = 'nowrap';
  var md = (mxClient.IS_TOUCH) ? 'touchstart' : 'mousedown';

  // Delete
  var img = mxUtils.createImage('./src/img/delete.gif');
  img.style.cursor = 'pointer';
  img.style.width = '16px';
  img.style.height = '16px';
  mxEvent.addListener(img, md,
    mxUtils.bind(this, function(evt)
    {
      // Disables dragging the image
      mxEvent.consume(evt);
    })
  );
  mxEvent.addListener(img, 'click',
    mxUtils.bind(this, function(evt)
    {
      this.graph.removeCells([this.state.cell]);
      mxEvent.consume(evt);
    })
  );
  this.domNode.appendChild(img);

  this.graph.container.appendChild(this.domNode);
  this.redrawTools();
};

mxVertexToolHandler.prototype.redraw = function()
{
  mxVertexHandler.prototype.redraw.apply(this);
  this.redrawTools();
};

mxVertexToolHandler.prototype.redrawTools = function()
{
  if (this.state != null && this.domNode != null)
  {
    var dy = (mxClient.IS_VML && document.compatMode == 'CSS1Compat') ? 20 : 4;
    this.domNode.style.left = (this.state.x + this.state.width - 56) + 'px';
    this.domNode.style.top = (this.state.y + this.state.height + dy) + 'px';
  }
};

mxVertexToolHandler.prototype.destroy = function(sender, me)
{
  mxVertexHandler.prototype.destroy.apply(this, arguments);

  if (this.domNode != null)
  {
    this.domNode.parentNode.removeChild(this.domNode);
    this.domNode = null;
  }
};
