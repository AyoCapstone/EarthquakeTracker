$(document).ready(function() {
     
     $.getJSON("http://interviewtest.getguru.com/seismic/data.json", function(json) {
         
         //FOR CONVERTING DATE FORMAT
         function formatDate(date) {
            var d = new Date(date);
            var formattedDate = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
            var hours = (d.getHours() < 10) ? "0" + d.getHours() : d.getHours();
            var minutes = (d.getMinutes() < 10) ? "0" + d.getMinutes() : d.getMinutes();
            var formattedTime = hours + ":" + minutes;

            //formattedDate = formattedDate + formattedTime;
              // return formattedDate;
               
               function getMonthName(formattedDate, locale) {
                    var date = new Date(formattedDate);
                    return date.toLocaleDateString(locale, { month: 'long' });        
                }

                var date = getMonthName(formattedDate) + " " + d.getDate() + "th, " + d.getFullYear() + " @ " + formattedTime;
                return date; 
           }
        
        //FOR BINDING JSON DATA TO TABLE
        var tr;
        for (var i = 0; i < json.length - 30; i++) {
            tr = $('<tr/>');
            tr.append("<td>" + json[i].id + "</td>");
            tr.append("<td>" + json[i].place + "</td>");
            tr.append("<td>" + formatDate(json[i].time) + "</td>");
            tr.append("<td class= text-center>" + json[i].mag + "</td>");
            tr.append("<td " + "class= quake-coords>" + json[i].latitude + ', ' + json[i].longitude + "</td>");
            tr.append("<td class= btn-center><button class= js--table-buttons></button></td>");
            $('tbody').append(tr);
        }
         
         //FOR SORTING MANGITUDE AND TIME
        $("#myTable").tablesorter({
            sortList: [[3,1]]
        });
         
         //FOR TABLE BUTTONS
         $('.js--table-buttons').addClass('btn btn-sm btn-primary ion-pinpoint');
         
         //FOR INDIVIDUAL COORD BUTTON
          $('.js--table-buttons').on('click', function() {
            var row = $(this).parents('tr');
            var coord = $('td:nth-child(5)', row);
              
              $(this).addClass('one-button');
              var buttonClicked = $('.one-button');
              
              if (buttonClicked.hasClass('btn-primary')) {
                  buttonClicked.removeClass('btn-primary');
                  buttonClicked.addClass('btn-danger');
                  coord.addClass('one-coord');
                  $('.one-coord').css("display", "table-cell");
              }
              else {
                  buttonClicked.removeClass('btn-danger one-button');
                  buttonClicked.addClass('btn-primary');
                  $('.one-coord').css("display", "none");
                  coord.removeClass('one-coord');
              }
        });
         
         //FOR GLOBAL & INDIVIDUAL COORD BUTTONS
         $('.js--button').click(function() {
             var globalbutton = $('.js--button');
             var button = $('.js--table-buttons')
             if (globalbutton.hasClass('btn-primary')) {
                 globalbutton.addClass('btn-danger');
                 globalbutton.removeClass('btn-primary');
                 globalbutton.text('Hide All Coords');
                 $('.quake-coords').show('slideIn');
                 button.hide('slideOut');
             }
             else {
                 globalbutton.addClass('btn-primary');
                 globalbutton.removeClass('btn-danger');
                 globalbutton.text('Show All Coords');
                 $('.quake-coords').hide('SlideOut');
                 button.show('slideIn');
             }
            }); 
    });
    
        
    
        //FOR SEARCHING BY LOCATION
        document.getElementById("searchInput").onkeyup = function() {
            searchLocation();
        };
        function searchLocation() {
          // Declare variables 
          var input, filter, table, tr, td, i;
          input = document.getElementById("searchInput");
          filter = input.value.toUpperCase();
          table = document.getElementById("myTable");
          tr = table.getElementsByTagName("tr");

          // Loop through all table rows, and hide those who don't match the search query
          for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[1];
            if (td) {
              if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
              } else {
                tr[i].style.display = "none";
              }
            } 
          }
        }
    
         
    
    });

    
    
    
