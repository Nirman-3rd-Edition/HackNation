package com.example.binarybrink;

import android.content.Intent;
import android.os.Bundle;
import androidx.cardview.widget.CardView;
import androidx.fragment.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

public class VehicleFragment extends Fragment {
    private LinearLayout vehicleLayout;

    public VehicleFragment() {
        // Required empty public constructor
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.fragment_vehicle, container, false);
        vehicleLayout = rootView.findViewById(R.id.VehicleLayout);

        addVehicle("TATA Nexon EV", "DC001                                                    45%", R.drawable.tata, 900, 200);
        addVehicle("OLA S1 Pro", "CCS01                                                    78%", R.drawable.ola, 900, 200);
        addVehicle("Pravaig Dynamics", "AC001                                                    10%", R.drawable.pravaig_dynamics, 900, 200);

        return rootView;
    }

    private void addVehicle(String title, String description, int imageResource, int cardWidth, int cardHeight) {
        CardView cardView = new CardView(requireContext());
        LinearLayout.LayoutParams layoutParams = new LinearLayout.LayoutParams(
                cardWidth,
                cardHeight
        );
        layoutParams.setMargins(16, 16, 16, 16);
        cardView.setLayoutParams(layoutParams);
        cardView.setCardBackgroundColor(getResources().getColor(android.R.color.black));
        cardView.setRadius(30);

        LinearLayout innerLayout = new LinearLayout(requireContext());
        innerLayout.setOrientation(LinearLayout.HORIZONTAL);
        LinearLayout.LayoutParams innerLayoutParams = new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT,
                LinearLayout.LayoutParams.WRAP_CONTENT
        );
        innerLayoutParams.setMargins(16, 16, 16, 16);
        innerLayout.setLayoutParams(innerLayoutParams);

        ImageView imageView = new ImageView(requireContext());
        imageView.setImageResource(imageResource);
        LinearLayout.LayoutParams imageLayoutParams = new LinearLayout.LayoutParams(
                200,
                150
        );
        imageView.setLayoutParams(imageLayoutParams);
        innerLayout.addView(imageView);

        LinearLayout innerLayout2 = new LinearLayout(requireContext());
        innerLayout2.setOrientation(LinearLayout.VERTICAL);
        LinearLayout.LayoutParams innerLayoutParams2 = new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT,
                LinearLayout.LayoutParams.WRAP_CONTENT
        );
        innerLayoutParams2.setMargins(16, 16, 16, 16);
        innerLayout2.setLayoutParams(innerLayoutParams2);

        TextView titleTextView = new TextView(requireContext());
        titleTextView.setTextAppearance(android.R.style.TextAppearance_Material_Body1);
        titleTextView.setTextSize(24);
        titleTextView.setText(title);
        innerLayout2.addView(titleTextView);

        TextView descriptionTextView = new TextView(requireContext());
        descriptionTextView.setTextAppearance(android.R.style.TextAppearance_Material_Body2);
        descriptionTextView.setText(description);
        innerLayout2.addView(descriptionTextView);

        innerLayout.addView(innerLayout2);
        cardView.addView(innerLayout);
        vehicleLayout.addView(cardView);

        cardView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(requireContext(), VehicleDetailsActivity.class);
                // Passing data
                intent.putExtra("title", title);
                intent.putExtra("description", description);
                intent.putExtra("imageResource", imageResource);

                startActivity(intent);
            }
        });
    }
}