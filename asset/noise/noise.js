////////////////////////////////////////////
// LEGEND
// 0 -> water
// 'wg_y_top' -> transition water-grass-y-top
// 'wg_y_bottom' -> transition water-grass-y-bottom
// 'wg_x_left' -> transition water-grass-y-left
// 'wg_x_right' -> transition water-grass-y-right
// 0.2 -> grass1
// 0.4 -> grass2
// 0.6 -> ground1
// 0.8 -> ground2

////////////////////////////////////////////
// Contruction de la matrice
////////////////////////////////////////////
var noise = generateNoise();
////////////////////////////////////////////
// get transitions
////////////////////////////////////////////
// eau terre 
var wg_y_top = mlib.getYArrayInMatrix(1,0.6,noise);
var wg_y_bottom = mlib.getYArrayInMatrix(0.6,1,noise);
var wg_x_left = mlib.getXArrayInMatrix(1,0.6,noise);
var wg_x_right = mlib.getXArrayInMatrix(0.6,1,noise);

////////////////////////////////////////////
// Application des transitions
////////////////////////////////////////////
noise = mlib.setValToCoordinates('wg_y_top',noise,wg_y_top);
noise = mlib.setValToCoordinates('wg_y_bottom',noise,wg_y_bottom);
noise = mlib.setValToCoordinates('wg_x_left',noise,wg_x_left);
noise = mlib.setValToCoordinates('wg_x_right',noise,wg_x_right);

// var canvas     = document.getElementById('noise_1');
// var context = canvas.getContext('2d');

for(x = 0; x < noise.length; x++)
{
    for(y = 0; y < noise[x].length; y++)
    {
        //var color = Math.round((255 * noise[x][y]));

        ////////////////////////////////////////////
        // Choix des classes
        var className = "ground2 el";
        if(noise[x][y] == 'wg_y_top') className = "wg_y_top el";
        if(noise[x][y] == 'wg_y_bottom') className = "wg_y_bottom el";
        if(noise[x][y] == 'wg_x_left') className = "wg_x_left el";
        if(noise[x][y] == 'wg_x_right') className = "wg_x_right el";
        if(noise[x][y] == 0.2) className = "ground1 el";
        if(noise[x][y] == 0.4) className = "grass2 el";
        if(noise[x][y] == 0.6) className = "grass1 el";
        if(noise[x][y] == 1) className = "water el";
        

        $('<div>', {id : 'maDiv', class: className, style: 'position:absolute;width:30px;height:30px;top:'+x*30+'px;left:'+y*30+'px;'}).appendTo($(content));

        // context.fillStyle = "rgb("+color+", "+color+", "+color+")";
        // context.fillRect(x*10, y*10, 100, 100);
    }
}

function generateNoise()
{
    var noiseArr = new Array();

    for(i = 0; i <= 5; i++)
    {
        noiseArr[i] = new Array();

        for(j = 0; j <= 5; j++)
        {
            var height = Math.random();

            if(i == 0 || j == 0 || i == 5 || j == 5)
                height = 1;

            noiseArr[i][j] = height;
        }
    }

    return(flatten(interpolate(noiseArr)));
}

function interpolate(points)
{
    var noiseArr = new Array()
    var x = 0;
    var y = 0;

    for(i = 0; i < 150; i++)
    {
        if(i != 0 && i % 30 == 0)
            x++;

        noiseArr[i] = new Array();
        for(j = 0; j < 150; j++)
        {
            
            if(j != 0 && j % 30 == 0)
                y++;

            var mu_x = (i%30) / 30;
            var mu_2 = (1 - Math.cos(mu_x * Math.PI)) / 2;

            var int_x1     = points[x][y] * (1 - mu_2) + points[x+1][y] * mu_2;
            var int_x2     = points[x][y+1] * (1 - mu_2) + points[x+1][y+1] * mu_2;

            var mu_y = (j%30) / 30;
            var mu_2 = (1 - Math.cos(mu_y * Math.PI)) / 2;
            var int_y = int_x1 * (1 - mu_2) + int_x2 * mu_2;

            noiseArr[i][j] = int_y;
        }
        y = 0;
    }        
    return(noiseArr);
}

function flatten(points)
{
    var noiseArr = new Array()
    for(i = 0; i < points.length; i++)
    {
        noiseArr[i] = new Array()
        for(j = 0; j < points[i].length; j++)
        {

            if(points[i][j] < 0.2)
                noiseArr[i][j] = 0;

            else if(points[i][j] < 0.4)
                noiseArr[i][j] = 0.2;

            else if(points[i][j] < 0.6)
                noiseArr[i][j] = 0.4;

            else if(points[i][j] < 0.8)
                noiseArr[i][j] = 0.6;

            else
                noiseArr[i][j] = 1;
        }
    }

    return(noiseArr);
}