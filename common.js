

function CalculateTotal(){
	var totalRowsLength = $(document).find('.modal-body .numberOfItems').length;
	if(totalRowsLength > 0){
		var _totalInvoice = 0;
		for(var i = 0;i<totalRowsLength;i++){
			var _rowResult = $(document).find('.modal-body .MainTable .itemRowCount:eq('+i+')').val();
			if(_rowResult > 0)
				_totalInvoice += parseFloat(_rowResult);
		}
		_totalInvoice = parseFloat(_totalInvoice);
		$(document).find('.InvoiceTable').find('.lblInvoiceTotal').text(_totalInvoice);
	}
}
$(document).ready(function(){
	$('li #showCart').on('click',function(){
		$('.modal').modal('show');
	});
	$(window).on('load',function(){
		$('#loading').fadeOut(3000);
	});
	$(document).on('click','.modal-body .remove',function(){
	  var totalRowsLength = $('.modal-body').find('tr.mainRow').length;
	  if(totalRowsLength == 1){
		$('.modal-body').html('');
		$('.modal-footer button').attr('disabled','disabled');
		  var _data = '<table class="table table-bordered">'
			  +'<tbody>'
			  +'<tr>'
			  +'<td disabled="disabled">'
			  +'No Items Selected In Cart'
			  +'</td>'
			  +'</tr>'
			  +'</tbody>'
			  +'</table>';
			$('.modal-body').append(_data);
			$('.navbar span.shopping_cart_Total').text('');
	  }
	  else{
		  $(this).closest('tr.mainRow').fadeOut('slow', function() {
            $(this).closest('tr.mainRow').remove();
			var totalRowsCount = $('.modal-body').find('tr.mainRow').length;
		    $('.navbar span.shopping_cart_Total').text(totalRowsCount == "0" ? '' : totalRowsCount);
			CalculateTotal();
		  });
	  }
	});
	$('button.addToCart').on('click',function(){
		
		var itemName = $(this).closest('div.card').find('h3').text();
		var _priceLenth = $(this).closest('div.card').find('.price').text().length;
		var _price = $(this).closest('div.card').find('.price').text().substring(1, _priceLenth);
		
		var row = '<tr class="mainRow">'
				+'<td data-price='+_price+'>'+itemName+' $('+_price+')</td>'
				+'<td>'
					+'<table>'
						+'<tbody>'
							+'<tr>'
								+'<td style="padding-right:5px" >'
									+'<input type="text" class="form-control input-xs numberOfItems" />'
								+'</td>'
								+'<td style="padding-left:10px">'
									+'<input type="text" class="form-control input-xs itemRowCount" disabled="disabled" />'
								+'</td>'
							+'</tr>'
						+'<tbody>'
					+'</table>'
				+'</td>'
				+'<td>'
					+'<button type="button" class="btn btn-primary remove btn-xs">Remove</button>'
				+'</td>'
			  +'</tr>';
		$('.MainTable tbody:first').append(row);
		$('.modal-footer button').removeClass('hidden');
		$('.MainTable').removeClass('hidden');
		
		var invoiceTable = $(document).find('.InvoiceTable').length;
		if(invoiceTable == 0){
			var secondTable = '<table class="table table-bordered InvoiceTable">'
				+'<tbody>'
				  +'<tr>'
					+'<td>Invoice Total</td>'
					+'<td><label class="lblInvoiceTotal"></label></td>'
				  +'</tr>'
				+'</tbody>'
			+'</table>';
			
			$('.modal-body').append(secondTable);
		}
		
		var totalRowsCount = $(document).find('.modal-body .mainRow').length;
		$('.navbar span.shopping_cart_Total').text(totalRowsCount);
		
		$(this).addClass('btn btn-disabled').prop('disabled',true);
		
	});
	$(document).on('keyup','.modal-body .numberOfItems',function(){
		var numberOfItems = parseFloat($(this).val());
		if(isNaN(numberOfItems)){
			numberOfItems = 0;
			$(this).val(numberOfItems);
		}
		else{
			var price = parseFloat($(this).closest('tr.mainRow').find('td:first').attr('data-price'));
			var rowTotal = parseFloat(price) * numberOfItems;
			rowTotal = parseFloat(rowTotal);
			$(this).closest('tr').find('.itemRowCount').val(rowTotal);
			
			CalculateTotal();
		}
	});
	$(document).on('click','.btnOk',function(){
		$(document).find('.panel-body').find('input').length;
		
		var ok = true;
		$(document).find('.panel-body').find('input').each(function(){
			if($(this).val() == ""){
				ok = false;
				return false;
			}
		});
		if(!ok){
			alert('Please Enter Data & Try Again');
			return false;
		}
		else{
			$(document).find('.panel-body').find('input').val('');
			alert('success');
			return false;
		}
	});
	$(document).on('click','.ProceedToCheckout',function(){
		var totalAmount = parseFloat($(document).find('.InvoiceTable').find('.lblInvoiceTotal').text());
			if(totalAmount > 0){
				alert('success');
				window.location.reload();
			}
			else{
				alert('Please enter any item quantity & Try again');
				return false;
			}
	});
});